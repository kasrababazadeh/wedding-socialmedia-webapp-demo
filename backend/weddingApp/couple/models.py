from django.db import models
import qrcode
from io import BytesIO
from django.core.files import File
from uuid import uuid4
from django.utils.text import slugify
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, phone_number, **extra_fields):
        if not phone_number:
            raise ValueError('Phone number is required')
        user = self.model(phone_number=phone_number, **extra_fields)
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPES = [
        ('donator', 'Donator'),
        ('couple', 'Couple'),
        ('admin', 'Admin'),
        ('staff', 'Staff'),
    ]
    phone_number = models.CharField(max_length=15, unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPES, default='donator')

    USERNAME_FIELD = 'phone_number'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.phone_number


class Couple(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='couple_profile')
    partner1_forename = models.CharField(max_length=50)
    partner1_surname = models.CharField(max_length=50)
    partner1_national_id = models.CharField(max_length=10)
    partner2_forename = models.CharField(max_length=50)
    partner2_surname = models.CharField(max_length=50)
    partner2_national_id = models.CharField(max_length=10)
    email = models.EmailField(blank=True, null=True)
    document = models.FileField(upload_to='documents/', blank=True, null=True)

    slug = models.SlugField(unique=True, blank=True)
    qr   = models.ImageField(upload_to="qr/", blank=True, null=True)

    def save(self, *args, **kwargs):
        # Auto-generate slug if not set
        if not self.slug:
            base_slug = slugify(f"{self.partner1_forename}-{self.partner2_forename}")
            unique_slug = f"{base_slug}-{uuid4().hex[:6]}"
            self.slug = unique_slug

            # Ensure slug uniqueness
            counter = 1
            original_slug = self.slug
            while Couple.objects.filter(slug=self.slug).exists():
                self.slug = f"{original_slug}-{counter}"
                counter += 1

        # Generate QR code if not already present
        if not self.qr:
            url = f"http://localhost:3000/couple/{self.slug}/"  # Adapt to your domain
            qr_img = qrcode.make(url)
            buffer = BytesIO()
            qr_img.save(buffer, format='PNG')
            self.qr.save(f"{self.slug}_qr.png", File(buffer), save=False)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.partner1_forename} & {self.partner2_forename}"


class CoupleExtraInfo(models.Model):
    couple = models.OneToOneField(Couple, on_delete=models.CASCADE, related_name='extra_info')
    extra_data = models.TextField(blank=True, null=True)

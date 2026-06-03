# yourapp/models.py

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils import timezone
import random


class UserManager(BaseUserManager):
    def create_user(self, phone_number):
        user = self.model(phone_number=phone_number)
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None):
        user = self.create_user(phone_number)
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    phone_number = models.CharField(max_length=15, unique=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'phone_number'

    def __str__(self):
        return self.phone_number

    @property
    def is_staff(self):
        return self.is_admin


class OTP(models.Model):
    phone_number = models.CharField(max_length=15)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(minutes=5)

class Couple(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    partner1_forename = models.CharField(max_length=100)
    partner1_surname = models.CharField(max_length=100)
    partner2_forename = models.CharField(max_length=100)
    partner2_surname = models.CharField(max_length=100)
    email = models.EmailField(blank=True)
    document = models.FileField(upload_to='documents/')
    created_at = models.DateTimeField(auto_now_add=True)

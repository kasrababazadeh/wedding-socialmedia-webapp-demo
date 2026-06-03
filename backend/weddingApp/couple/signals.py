# apps/couples/signals.py
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils.text import slugify
from .models import Couple
from .utils import generate_qr_for_couple

@receiver(pre_save, sender=Couple)
def add_slug(sender, instance, **kwargs):
    if not instance.slug:
        base = f"{instance.partner1_forename}-{instance.partner2_forename}"
        instance.slug = slugify(base)

@receiver(post_save, sender=Couple)
def create_qr(sender, instance, created, **kwargs):
    # regenerate only if new or slug changed or qr missing
    if created or not instance.qr:
        instance.qr = generate_qr_for_couple(instance)
        # avoid endless loop: update_fields avoids re‑triggering add_slug
        instance.save(update_fields=["qr"])

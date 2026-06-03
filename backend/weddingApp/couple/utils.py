from django.utils.text import slugify
import random, string

def unique_slug(model, base):
    slug = slugify(base)
    while model.objects.filter(slug=slug).exists():
        slug = f"{slug}-{''.join(random.choices(string.ascii_lowercase+string.digits, k=4))}"
    return slug

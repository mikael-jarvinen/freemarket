from django.conf import settings
from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser


from .managers import UserManager


class Listing(models.Model):
    price = models.DecimalField(decimal_places=2, max_digits=9)
    title = models.CharField(max_length=25, unique=True)
    description = models.TextField(max_length=1000)
    created = models.DateTimeField(auto_now_add=True)
    postal_code = models.IntegerField()
    is_active = models.BooleanField(default=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='listings',
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ['created']


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=60, blank=True)
    display_name = models.CharField(max_length=30, unique=True)
    created = models.DateTimeField(auto_now_add=True)
    biography = models.TextField(max_length=1000, blank=True)
    website = models.URLField(blank=True)
    is_active = models.BooleanField(default=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['display name']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def get_full_name(self):
        return f'{self.display_name}: {self.full_name}'

    def get_short_name(self):
        return self.display_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)


class Order(models.Model):
    STATUS_CHOICES = [
        ('FINISHED', 'finished'),
        ('SHIPPED', 'shipped'),
        ('PROCESSED', 'processed'),
        ('WAITING', 'waiting for processing')
    ]
    buyer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='purchases',
        on_delete=models.DO_NOTHING
    )
    seller = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='orders',
        on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        Listing,
        related_name='orders',
        on_delete=models.DO_NOTHING
    )
    quantity = models.IntegerField(default=True)
    status = models.CharField(choices=STATUS_CHOICES, default='WAITING')
    order_date = models.DateTimeField(auto_now_add=True)


class PostalInfo(models.Model):
    street_address = models.CharField(max_length=60)
    country = models.CharField(max_length=30)
    city = models.CharField(max_length=30)
    postal_code = models.IntegerField()
    full_name = models.CharField(max_length=60)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=15, blank=True)


class Review(models.Model):
    FEEDBACK_CHOICES = [
        ('POSITIVE', 'positive'),
        ('NEUTRAL', 'neutral'),
        ('NEGATIVE', 'negative')
    ]

    feedback = models.CharField(
        max_length=8,
        choices=FEEDBACK_CHOICES,
        default='NEGATIVE'
    )
    review = models.TextField(max_length=200)
    target = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='reviews',
        on_delete=models.CASCADE
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='given_reviews',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created']


class Question(models.Model):
    listing = models.ForeignKey(
        Listing,
        related_name='questions',
        on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
    question = models.CharField(max_length=200)
    reply = models.TextField(max_length=1000, null=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ['created']

from django.db import models

FEEDBACK_CHOICES = [
  ('POSITIVE', 'positive'),
  ('NEUTRAL', 'neutral'),
  ('NEGATIVE', 'negative')
]

class Listing(models.Model):
  price = models.IntegerField()
  title = models.CharField(max_length=25)
  description = models.TextField(max_length=1000)
  created = models.DateTimeField(auto_now_add=True)
  postal_code = models.IntegerField()
  author = models.ForeignKey('User', null=True, related_name='listings',on_delete=models.CASCADE)

  class Meta:
    ordering = ['created']

class User(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  display_name = models.CharField(max_length=25)
  full_name = models.CharField(max_length=25)
  email = models.EmailField()
  description = models.TextField(max_length=1000, null=True)
  website = models.URLField(null=True)

class Review(models.Model):
  feedback = models.CharField(max_length=8, choices=FEEDBACK_CHOICES, default='NEGATIVE')
  review = models.TextField(max_length=200)
  target = models.ForeignKey(User, null=True, related_name='reviews', on_delete=models.CASCADE)
  author = models.ForeignKey(User, null=True, related_name='given_reviews', on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)

  class Meta:
    ordering = ['created']

class Question(models.Model):
  listing = models.ForeignKey(Listing, null=True, related_name='questions', on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)
  question = models.CharField(max_length=200)
  reply = models.TextField(max_length=1000, null=True)
  author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)

  class Meta:
    ordering = ['created']
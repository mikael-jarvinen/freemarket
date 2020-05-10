from django.db import models

class Listing(models.Model):
  price = models.IntegerField()
  title = models.CharField(max_length=25)
  description = models.TextField(max_length=1000)
  created = models.DateTimeField(auto_now_add=True)
  postal_code = models.IntegerField(max_length=10)
  author = models.ForeignKey('User', on_delete=models.CASCADE)
  questions = models.ManyToManyField('Question', null=True, on_delete=models.SET_NULL)

class User(models.Model):
  joined = models.DateTimeField(auto_now_add=True)
  display_name = models.CharField(max_length=25)
  full_name = models.CharField()
  listings = models.ManyToManyField(Listing, null=True, on_delete=models.SET_NULL)
  feedback = models.ManyToManyField('Review', null=True, on_delete=models.SET_NULL)

class Review(models.Model):
  FEEDBACK_CHOICES = [
  ('POSITIVE', 'positive'),
  ('NEUTRAL', 'neutral'),
  ('NEGATIVE', 'negative')
  ]
  feedback = models.CharField(choices=FEEDBACK_CHOICES, default='NEGATIVE')
  review = models.TextField(max_length=200)
  author = models.ForeignKey(User, on_delete=models.CASCADE)
  created = models.DateTimeField(auto_now_add=True)

class Question(models.Model):
  created = models.DateTimeField(auto_now_add=True)
  question = models.CharField(max_length=200)
  reply = models.TextField(max_length=1000, null=True)
  author = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
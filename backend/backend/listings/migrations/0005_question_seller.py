# Generated by Django 3.0.6 on 2020-05-18 15:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0004_delete_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='seller',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='questions', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]

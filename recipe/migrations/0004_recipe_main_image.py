# Generated by Django 3.1 on 2021-07-01 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0003_recipe_process2'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='main_image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]

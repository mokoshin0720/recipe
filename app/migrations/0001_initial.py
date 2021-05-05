# Generated by Django 3.2 on 2021-05-05 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='タスク名')),
                ('created_date', models.DateTimeField(auto_now_add=True, verbose_name='作成日時')),
                ('update_date', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
            ],
        ),
    ]

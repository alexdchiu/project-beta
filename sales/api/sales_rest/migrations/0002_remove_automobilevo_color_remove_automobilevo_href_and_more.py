# Generated by Django 4.0.3 on 2022-06-21 01:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='color',
        ),
        migrations.RemoveField(
            model_name='automobilevo',
            name='href',
        ),
        migrations.RemoveField(
            model_name='automobilevo',
            name='year',
        ),
    ]

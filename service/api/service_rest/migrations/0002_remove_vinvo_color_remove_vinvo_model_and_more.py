# Generated by Django 4.0.3 on 2022-06-21 01:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='vinvo',
            name='color',
        ),
        migrations.RemoveField(
            model_name='vinvo',
            name='model',
        ),
        migrations.RemoveField(
            model_name='vinvo',
            name='year',
        ),
    ]

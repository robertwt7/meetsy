# Generated by Django 4.0.1 on 2022-02-27 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0006_alter_events_expiry'),
    ]

    operations = [
        migrations.AddField(
            model_name='events',
            name='duration',
            field=models.IntegerField(default=15),
            preserve_default=False,
        ),
    ]
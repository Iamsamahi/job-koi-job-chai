# Generated by Django 5.1.5 on 2025-03-26 19:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_userprofile_resume'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='resume',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]

# Generated by Django 5.1.5 on 2025-03-26 11:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_userprofile_resume'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='resume',
            field=models.FileField(null=True, upload_to=''),
        ),
    ]

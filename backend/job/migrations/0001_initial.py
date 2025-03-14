# Generated by Django 5.1.5 on 2025-01-20 17:25

import django.contrib.gis.db.models.fields
import django.contrib.gis.geos.point
import django.core.validators
import django.db.models.deletion
import job.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=250, null=True)),
                ('description', models.TextField(null=True)),
                ('email', models.EmailField(max_length=254, null=True)),
                ('address', models.CharField(max_length=150, null=True)),
                ('jobType', models.CharField(choices=[('Permanent', 'Permanent'), ('Temporary', 'Temporary'), ('Internship', 'Internship')], default='Permanent', max_length=50)),
                ('education', models.CharField(choices=[('Bachelors', 'Bachelors'), ('Masters', 'Masters'), ('Phd', 'Phd')], default='Bachelors', max_length=50)),
                ('industry', models.CharField(choices=[('Business', 'Business'), ('Information Technology', 'It'), ('Banking', 'Banking'), ('Education or Training', 'Education'), ('Medical', 'Medical'), ('Tele Communiction', 'Telecommunication'), ('Sports', 'Sports'), ('Others', 'Others')], default='Business', max_length=50)),
                ('experience', models.CharField(choices=[('No Experience', 'No Experience'), ('1 Years', 'One Year'), ('2 Years', 'Two Year'), ('More than 2 years', 'Two Year Plus')], default='No Experience', max_length=50)),
                ('salary', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(1000000)])),
                ('positions', models.IntegerField(default=1)),
                ('company', models.CharField(max_length=100, null=True)),
                ('point', django.contrib.gis.db.models.fields.PointField(default=django.contrib.gis.geos.point.Point(0.0, 0.0), srid=4326)),
                ('lastDate', models.DateField(default=job.models.return_date_time)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

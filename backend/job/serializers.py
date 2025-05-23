from rest_framework import serializers
from .models import Job, CandidatesApplied
from datetime import datetime

class JobSerializer(serializers.ModelSerializer):
    formatted_last_date = serializers.SerializerMethodField(read_only=True)
    point = serializers.SerializerMethodField(read_only=True)  # Add this

    class Meta:
        model = Job
        fields = [
            'id', 'title', 'description', 'email', 'address',
            'jobType', 'education', 'industry', 'experience',
            'salary', 'positions', 'company', 'point',
            'formatted_last_date', 
            'user', 'createdAt'
        ]
        read_only_fields = ('user',)

    def get_formatted_last_date(self, obj):
        # Format lastDate as a date string (YYYY-MM-DD)
        if obj.lastDate:
            return obj.lastDate.strftime('%Y-%m-%d')
        return None  # Or a default date string if lastDate is None

    def get_point(self, obj):
        # Return point in GeoJSON format
        if obj.point and obj.point.x != 0.0 and obj.point.y != 0.0:
            return {
                "type": "Point",
                "coordinates": [float(obj.point.x), float(obj.point.y)]  # [lng, lat]
            }
        return None  # Return None for invalid or default (0,0) points

    def to_internal_value(self, data):
        # Convert formatted_last_date back to lastDate when creating/updating
        if 'formatted_last_date' in data:
            try:
                # Attempt to parse the date string
                data['lastDate'] = datetime.strptime(data['formatted_last_date'], '%Y-%m-%d').date()
            except ValueError:
                raise serializers.ValidationError({'formatted_last_date': 'Invalid date format. Use YYYY-MM-DD.'})
            del data['formatted_last_date']  # Remove the custom field

        return super().to_internal_value(data)

class CandidatesAppliedSerializer(serializers.ModelSerializer):
    job = JobSerializer()

    class Meta: 
        model = CandidatesApplied 
        fields = ['job', 'user', 'appliedAt', 'resume']
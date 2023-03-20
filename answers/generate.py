import csv
import json

hobbies = []
jobs = []

with open('answers.csv', newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        hobbies.append(row['hobby'])
        jobs.append(row['job'])

with open('tags1.json', 'w') as outfile:
    json.dump(hobbies, outfile)

with open('tags2.json', 'w') as outfile:
    json.dump(jobs, outfile)
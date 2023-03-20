import csv
import json

hobbies = []
jobs = []

with open('answers/answers.csv', newline='', encoding='utf-8') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        if row['hobby']:
            hobbies.append(row['hobby'])
        if row['job']:
            jobs.append(row['job'])

tags1 = [{"name": hobby, "link": "fake-link"} for hobby in hobbies]
tags2 = [{"name": job, "link": "fake-link"} for job in jobs]

with open('tags2.json', 'w', encoding='utf-8') as outfile:
    json.dump(tags1, outfile, indent=4, ensure_ascii=False, separators=(',', ':'))
    
with open('tags1.json', 'w', encoding='utf-8') as outfile:
    json.dump(tags2, outfile, indent=4, ensure_ascii=False, separators=(',', ':'))

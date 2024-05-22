import csv

# Paths to the files
input_file_path = '/Users/justinlee/Desktop/The Jerry Project/Blokes/updated_mint_data_with_rarity.csv'
output_file_path = '/Users/justinlee/Desktop/The Jerry Project/Blokes/trait_counts.txt'

# Load data from the CSV file
with open(input_file_path, mode='r', newline='') as infile:
    reader = csv.DictReader(infile)
    data = [row for row in reader]
    fieldnames = reader.fieldnames

# Calculate the counts for each trait
trait_counts = {field: {} for field in fieldnames if field not in ['Mint ID', 'Rarity Rank']}
for row in data:
    for field in trait_counts:
        value = row[field]
        if value not in trait_counts[field]:
            trait_counts[field][value] = 0
        trait_counts[field][value] += 1

# Write the trait counts to a text file
with open(output_file_path, 'w') as outfile:
    for trait, counts in trait_counts.items():
        outfile.write(f"Counts for {trait}:\n")
        for value, count in counts.items():
            outfile.write(f"{value}: {count}\n")
        outfile.write("\n")

print(f"Trait counts saved to: {output_file_path}")

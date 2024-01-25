import pandas as pd
import matplotlib.pyplot as plt

def visualize_csv(file_path):
    df = pd.read_csv(file_path)
    for column in df.columns:
        print(df[column])
        input()

if __name__ == "__main__":
    csv_file_path = 'pokemon.csv'
    visualize_csv(csv_file_path)

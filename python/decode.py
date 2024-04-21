fileName = "./file.txt"
def decode(message_file):
    # Read the encoded message from the file
    with open(message_file, 'r') as file:
        lines = file.readlines()

    numbers = []
    number_dec = {}
    for line in lines:
        i=int(line.split()[0])
        number_dec[i]=line.split()[1]
        numbers.append(i)
    numbers = sorted(numbers)

    decoded_msg = []

    pyramid = []
    index = 0
    while True:
        row = []
        for i in range(len(pyramid) + 1):
            if index >= len(numbers):
                break
            row.append(numbers[index])
            index += 1
        if not row:
            break
        pyramid.append(row)

    last_digits = []
    length_row = 1
    for row in pyramid:
        if len(row) == length_row:
            if row:
                last_digits.append(row[-1])
        length_row = length_row + 1
    final_text = ""
    final_array = []
    for i in last_digits:
        final_array.append(number_dec[i])
    final_text = ' '.join(map(str, final_array))
    return final_text
    
    


print(decode(fileName))
# Airplane-Seat-Allocation

[Edit on StackBlitz ⚡️](https://airplane-seat-allocation.stackblitz.io/)

Aircraft Seat Allocations:
An airline company has several planes of the same type. Each plane has a seating capacity of 24 with 3 rows and 8 seats in each row with split as shown below:

|   | a  b   c   d   e   f   g   h |
| ------------- | ------------- |
| 1  | [] []  []  []  []  []  []  []  |
| 2  | [] []  []  []  []  []  []  []  |
| 3  | [] []  []  []  []  []  []  []  |

```If 4 seats are requested - allocate 4 seats in the middle of the first available row. Else 2 on the right and 2 on the left.```

```If 3 seats are requested - If the middle section of the first available row is empty, allocate there continuously. Else go to the next row middle section.```

```If 2 seats are requested - Allocate the edge seats, 2 on the left or right.```

```If 1 seat is requested - then start from the edge, and allocate the first available seat.```

Example:

| INPUT  | OUTPUT |
| ------------- | ------------- |
| 4  | 1c 1d 1e 1f  |
| 3  | 2c 2d 2e  |
| 3  | 3c 3d 3e  |
| 2  | 1a 1b  |
| 2  | 1g 1h  |
| 4  | 2a 2b 2g 2h  |
| 1  | 2f  |


from random import choice
from time import sleep

TRAFFIC_STATUSES = ["red", "yellow", "green"]


def run_simulation(iterations=5):
    print("Starting Smart Ambulance traffic simulation")

    for step in range(1, iterations + 1):
        ambulance_location = choice(["Base Norte", "Avenida Central", "Ruta 27"])
        traffic_status = choice(TRAFFIC_STATUSES)

        print(
            f"Step {step}: ambulance at {ambulance_location}, "
            f"nearest traffic light is {traffic_status}"
        )
        sleep(1)

    print("Simulation finished")


if __name__ == "__main__":
    run_simulation()

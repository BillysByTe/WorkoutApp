export const getGreeting = () => {
    const greetings: [number, string][] = [
        [21, "Good Night,"],
        [17, "Good Evening,"],
        [12, "Good Afternoon,"],
        [5, "Good Morning,"],
        [0, "Good Night,"],
    ];

    const currentHour = new Date().getHours();
    for (let x = 0; x < greetings.length; x++) {
        if (currentHour >= greetings[x][0]) {
            return greetings[x][1];
        }
    }
};

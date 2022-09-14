// Release 0

const student = {};
student.firstName = "Petr";
student.lastName = "Perviy";

student.firstName = "Petya";
delete student.firstName;

// Release 1

let group = []; // создаем массив
group.push(student); // добавляем петю

const student2 = {
    firstName: "Mikle",
    lastName: "Beschastnov",
};
group.push(student2); // добавляем петю

const student3 = {
    firstName: "Waltari",
    lastName: "Bottas",
}
group.push(student3); // добавляем петю

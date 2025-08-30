//TypeScript 允许你给变量、函数参数和返回值指定类型，防止类型错误。
//类型检查：TypeScript 在编译时进行类型检查，帮助捕获潜在的错误。而 JavaScript 是动态类型语言，运行时才会进行类型检查。

//接口和类型系统：TypeScript 引入了接口（Interface）、类型别名（Type Alias）等类型系统特性，支持面向对象的编程方式。JavaScript 没有这些语法。

//类的修饰符：TypeScript 支持访问控制修饰符（如 public、private、protected）来控制类成员的可访问性。JavaScript 中没有这些修饰符。

// ===== BASIC TYPES =====
let userName: string = "John";
let userAge: number = 25;
let isActive: boolean = true;
let hobbies: string[] = ["reading", "gaming"];
let tuple: [string, number] = ["hello", 10];

// ===== INTERFACES =====
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

const user: User = {
  id: 1,
  name: "Alice"
};

// ===== FUNCTIONS =====
function greet(name: string): string {
  return `Hello, ${name}!`;
}

function greetUser(user: User): string {
    return `Hello, ${user.name}!`;
}

const multiply = (a: number, b: number): number => a * b;

// ===== GENERICS =====
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>("hello");

// ===== CLASSES =====
class Animal {
  private animalName: string;
  
  constructor(name: string) {
    this.animalName = name;
  }
  
  public makeSound(): void {
    console.log("Some sound");
  }
}

// ===== UNION TYPES =====
let appStatus: "loading" | "success" | "error" = "loading";

// ===== TYPE ALIASES =====
type Point = {
  x: number;
  y: number;
};

type ID = number | string;

const point: Point = { x: 10, y: 20 };




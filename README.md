# 🧮 Restoring Division Visualizer

An animated educational web app built with **React**, **Framer Motion**, and **Tailwind CSS** that visually demonstrates the **Restoring Division Algorithm** step-by-step for two integers.

![restoring-demo](https://via.placeholder.com/1000x300?text=Insert+Restoring+Division+Screenshot+or+GIF)

---

## ✨ Features

* 🔢 **Binary Division Visualized**: Watch the restoring division process unfold in real-time.
* 🧾 **Detailed Steps Table**: Displays all registers and operations clearly.
* 🎞️ **Smooth Animations**: Powered by Framer Motion for an intuitive experience.
* 🧠 **Educational Focus**: Ideal for students and teachers learning or explaining binary division algorithms.

---

## 🚀 Live Demo

> [🔗 Try the App Live](#)
> *(Replace with your deployed URL)*

---

## 📷 Preview

![restoring-preview](https://via.placeholder.com/1000x600?text=Add+GIF+or+Screenshot+of+your+UI)

---

## ⚙️ How It Works

The **Restoring Division Algorithm** is used to divide binary numbers using a method that restores the accumulator register to its original value if subtraction causes a negative result.

### Registers Tracked:

* **A** – Accumulator
* **Q** – Quotient Register
* **M** – Divisor Register

### Core Steps:

1. Left shift A and Q
2. Subtract M from A
3. Set quotient bit depending on sign of A
4. Restore A if subtraction was negative

Each iteration is animated and visualized in a clean, interactive table.

---

## 🧪 Tech Stack

* ⚛️ **React** – Frontend framework
* 💅 **Tailwind CSS** – For responsive UI and styling
* 🎞 **Framer Motion** – Beautiful transitions and animations
* 🧮 **Custom JS Algorithm** – Restoring Division logic

---

## 💡 Educational Use

This tool is designed for:

* 📘 CS students learning binary division
* 👨‍🏫 Instructors giving visual demos
* 🔍 Developers curious about low-level operations

---

## 🛠️ Getting Started

### 🔧 Local Setup

```bash
# Clone the repo
git clone https://github.com/your-username/restoring-division.git

# Navigate into the project directory
cd restoring-division

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and go to `http://localhost:3000`.

---

## 📁 Project Structure

```
├── app/
│   ├── page.tsx           # Main component
│   └── utils/
│       └── algorithm.js   # Restoring division logic
├── public/
│   └── assets/            # Screenshots or GIFs
├── styles/
│   └── globals.css
```

---

## 🤝 Contributing

Contributions are welcome!
Please open an issue or submit a pull request with improvements or bug fixes.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Your Name**
🔗 [GitHub](https://github.com/your-username)
🔗 [LinkedIn](https://linkedin.com/in/your-profile)

---

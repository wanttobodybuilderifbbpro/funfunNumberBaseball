const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateRandomNumber() {
  const numbers = [];
  while (numbers.length < 3) {
    const randomNumber = Math.floor(Math.random() * 10);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
}

function checkGuess(secret, guess) {
  let strikes = 0;
  let balls = 0;

  for (let i = 0; i < 3; i++) {
    if (guess[i] === secret[i]) {
      strikes++;
    } else if (secret.includes(guess[i])) {
      balls++;
    }
  }

  return { strikes, balls };
}

function playGame() {
  const secretNumber = generateRandomNumber();
  let attempts = 0;

  console.log(
    "숫자 야구 게임을 시작합니다. 0에서 9 사이의 서로 다른 숫자 3개를 맞춰보세요."
  );
  console.log("게임을 종료하려면 q를 입력하세요.");

  function makeGuess() {
    rl.question("숫자를 입력하세요: ", (input) => {
      if (input.toLowerCase() === "q") {
        console.log(
          "게임을 종료합니다. 정답은 " + secretNumber.join(" ") + "입니다."
        );
        rl.close();
      } else {
        const guess = input.replace(/\s/g, "").split("").map(Number);

        if (guess.length !== 3 || guess.some(isNaN)) {
          console.log(
            "올바른 입력이 아닙니다. 0에서 9 사이의 서로 다른 숫자 3개를 입력하세요."
          );
        } else {
          const result = checkGuess(secretNumber, guess);
          attempts++;

          console.log(
            `시도 ${attempts}: ${guess.join(" ")} - S: ${result.strikes}, B: ${
              result.balls
            }`
          );

          if (result.strikes === 3) {
            console.log(
              `축하합니다! ${attempts}번 만에 숫자를 모두 맞췄습니다.`
            );
            rl.close();
          } else {
            makeGuess();
          }
        }
      }
    });
  }

  makeGuess();
}

rl.on("close", () => {
  process.exit(0); // Node.js를 종료
});

playGame();

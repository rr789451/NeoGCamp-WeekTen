const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");
const nextBtn = document.querySelector("#next-btn");
const checkBtn = document.querySelector("#check-btn");
const cashContainer = document.querySelector(".cash-container");
const errorMsg = document.querySelector("#error");
const noNotes = document.querySelectorAll(".notes");
const tableContainer = document.querySelector(".table-container");

const notes = [2000, 500, 100, 20, 10, 5, 1];

const hideCashContainer = () => {
  cashContainer.style.display = "none";
  cashGiven.value = "";
};

const hideErrorMsg = () => {
  errorMsg.style.display = "none";
  errorMsg.innerText = "";
};

const hideTableContainer = () => {
  tableContainer.style.display = "none";
  for (let i = 0; i < notes.length; i++) {
    noNotes[i].innerText = "";
  }
};

const start = () => {
  hideCashContainer();
  hideErrorMsg();
  hideTableContainer();
};

start();

const showErrorMsg = (message) => {
  errorMsg.style.display = "block";
  errorMsg.innerText = message;
};

const NumberOfNotes = (returnAmount) => {
  for (let i = 0; i < notes.length; i++) {
    noNotes[i].innerText = Math.trunc(returnAmount / notes[i]);
    returnAmount %= notes[i];
  }
  tableContainer.style.display = "flex";
};

const validateBillAmount = (billAmount) => (billAmount <= 0 ? false : true);

const invalidBillAmount = () => {
  start();
  nextBtn.style.display = "block";
  showErrorMsg("Bill Amount should be greater than 0");
};

nextBtn.addEventListener("click", () => {
  if (validateBillAmount(billAmount.value)) {
    nextBtn.style.display = "none";
    cashContainer.style.display = "flex";
    hideErrorMsg();
  } else {
    invalidBillAmount();
  }
});

checkBtn.addEventListener("click", () => {
  hideErrorMsg();
  hideTableContainer();
  if (validateBillAmount(billAmount.value)) {
    const returnAmount = cashGiven.value - billAmount.value;
    if (returnAmount < 0) {
      showErrorMsg(
        "Cash Given should be greater than or equal to Bill Amount"
      );
    } else {
      if(returnAmount === 0){
        showErrorMsg("User paid exact amount no need give change");
        NumberOfNotes(returnAmount);
      }
      else{
        NumberOfNotes(returnAmount);
      }
    }
  } else {
    invalidBillAmount();
  }
});
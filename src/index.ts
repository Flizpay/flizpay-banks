import { BanksService, TOP_BANK_ORDER, type Bank } from "@/lib/main";

const bankList = document.querySelector<HTMLUListElement>("#bank-list")!;
const searchBankInput =
  document.querySelector<HTMLInputElement>("#search-bank")!;
const resetButton = document.querySelector<HTMLButtonElement>("#reset-button")!;

let banks: Bank[] = TOP_BANK_ORDER;
let query: string | undefined = undefined;

renderBanks(banks);

searchBankInput.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  query = target.value.toLowerCase();

  if (!query) {
    banks = TOP_BANK_ORDER;
    renderBanks(banks);
    return;
  }

  banks = BanksService.getBanks(undefined, query, undefined);
  renderBanks(banks);
});

resetButton.addEventListener("click", () => {
  searchBankInput.value = "";
  query = undefined;
  banks = TOP_BANK_ORDER;
  renderBanks(banks);
});

function renderBanks(list: Bank[]) {
  bankList.innerHTML = "";
  list.forEach((bank) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const img = document.createElement("img");
    const strong = document.createElement("strong");
    img.src = bank.logoUrl;
    img.alt = bank.name;
    strong.textContent = bank.name;
    button.addEventListener("click", () => handleSelectBank(bank));
    button.appendChild(img);
    button.appendChild(strong);
    li.appendChild(button);
    bankList.appendChild(li);
  });
}

function handleSelectBank(bank: Bank) {
  if (bank.group) {
    banks = BanksService.getBanks(undefined, undefined, bank.group);
    renderBanks(banks);
  }
}

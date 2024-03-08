class BankAccount {
  constructor(saldo = 0) {
    this.saldo = saldo;
  }

  saldoDisplay() {
    document.getElementById("saldoDisplay").innerText =
      "Saldo: Rp" + this.formatRupiah(this.saldo);
  }

  formatRupiah(angka) {
    return angka.toLocaleString("id-ID");
  }

  showWaitingMessage() {
    document.getElementById("waitingMessage").style.display = "block";
    let counter = 1;
    this.waitingInterval = setInterval(() => {
      waitingMessage.innerText = "Tunggu sebentar" + ".".repeat(counter);
      counter = (counter % 3) + 1;
    }, 1000);
  }

  hideWaitingMessage() {
    document.getElementById("waitingMessage").style.display = "none";
    clearInterval(this.waitingInterval);
  }

  deposit() {
    return new Promise((resolve, reject) => {
      let tambah = window.prompt("Masukkan jumlah saldo yang ingin ditambahkan: ");
      if (tambah === null) {
        return;
      }
      tambah = parseInt(tambah);
      if (!isNaN(tambah) && tambah > 0) {
        let randomTimeout = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
        this.showWaitingMessage();
        setTimeout(() => {
          this.saldo += tambah;
          this.saldoDisplay();
          this.hideWaitingMessage();
          resolve(`Rp${this.formatRupiah(tambah)} berhasil ditambahkan ke saldo.\nSaldo anda sekarang: Rp${this.formatRupiah(this.saldo)}`);
        }, randomTimeout);
      } else {
        return reject("Mohon masukkan jumlah saldo yang valid.");
      }
    });
  }  
  
  withdraw() {
    return new Promise((resolve, reject) => {
      let kurang = window.prompt("Masukkan jumlah saldo yang ingin dikurangi:");
      if (kurang === null) {
        return;
      }
      kurang = parseInt(kurang);
      if (!isNaN(kurang) && kurang > 0 && kurang <= this.saldo) {
        let randomTimeout = Math.floor(Math.random() * (7000 - 3000 + 1)) + 3000;
        this.showWaitingMessage();
        setTimeout(() => {
          this.saldo -= kurang;
          this.saldoDisplay();
          this.hideWaitingMessage();
          resolve(`Rp${this.formatRupiah(kurang)} berhasil dikeluarkan dari saldo.\nSaldo anda tersisa: Rp${this.formatRupiah(this.saldo)}`);
        }, randomTimeout);
      } else if (kurang > this.saldo) {
        reject("Saldo anda tidak mencukupi");
      } else {
        reject("Mohon masukkan jumlah saldo yang valid");
      }
    });
  }  
}

const Akunku = new BankAccount();

async function transaksiDeposit() {
  try {
    const result = await Akunku.deposit();
    window.alert(result);
  } catch (error) {
    window.alert(error);
  }
}

async function transaksiWithdraw() {
  try {
    const result = await Akunku.withdraw();
    window.alert(result);
  } catch (error) {
    window.alert(error);
  }
}

document.getElementById("tambahSaldoBtn").onclick = transaksiDeposit;
document.getElementById("kurangiSaldoBtn").onclick = transaksiWithdraw;
let balance = 0;

function goBack() {
    window.history.back();
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email && password) {
        document.getElementById("login-section").style.display = "none";
        document.getElementById("wallet-section").style.display = "block";

        if (email === "ahmedfouad01278837444@gmail.com") {
            alert("تم الدخول كمسؤول");
        }
    } else {
        alert("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
    }
}

function updateBalance() {
    document.getElementById("balance").innerText = balance.toFixed(2);
}

function deposit() {
    const amount = parseFloat(document.getElementById("depositAmount").value);
    if (amount >= 5) {
        balance += amount;
        updateBalance();
    } else {
        alert("أقل مبلغ للإيداع هو 5 جنيه");
    }
}

function withdraw() {
    const amount = parseFloat(document.getElementById("withdrawAmount").value);
    const phone = document.getElementById("withdrawPhone").value;

    if (amount >= 5 && phone) {
        if (balance >= amount) {
            balance -= amount;
            updateBalance();
            alert(`قم بتحويل ${amount} جنيه إلى الرقم ${phone}`);
        } else {
            alert("لا يوجد رصيد كافي");
        }
    } else {
        alert("أدخل مبلغ لا يقل عن 5 ورقم هاتف");
    }
}

function transfer() {
    const email = document.getElementById("transferEmail").value;
    const amount = parseFloat(document.getElementById("transferAmount").value);

    if (email && amount > 0) {
        if (balance >= amount) {
            balance -= amount;
            updateBalance();
            alert(`تم تحويل ${amount} جنيه إلى ${email}`);
        } else {
            alert("الرصيد غير كافي");
        }
    } else {
        alert("يرجى إدخال البريد الإلكتروني والمبلغ");
    }
}

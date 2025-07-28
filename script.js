async function startBinarySearch() {
    let arr = document.getElementById("arr").value.split(',').map(Number);
    let target = parseInt(document.getElementById("ele").value);

    if (arr.some(isNaN) || isNaN(target)) {
        document.getElementById("output").textContent = "Please enter valid numbers!";
        return;
    }

    arr.sort((a, b) => a - b);
    let container = document.getElementById("arrayContainer");
    container.innerHTML = "";

    arr.forEach((num, index) => {
        let wrapper = document.createElement("div");
        wrapper.className = "box-wrapper";
        wrapper.id = "wrapper-" + index;

        let arrow = document.createElement("div");
        arrow.className = "arrow";
        arrow.id = "arrow-" + index;
        arrow.textContent = "↓";

        let box = document.createElement("div");
        box.className = "box";
        box.textContent = num;
        box.id = "box-" + index;

        let label = document.createElement("div");
        label.className = "label";
        label.id = "label-" + index;

        wrapper.appendChild(arrow);
        wrapper.appendChild(box);
        wrapper.appendChild(label);
        container.appendChild(wrapper);
    });

    let low = 0, high = arr.length - 1;
    document.getElementById("output").textContent = "Searching...";

    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        highlightBoxes(low, high, mid);
        await delay(1300);

        if (arr[mid] === target) {
            document.getElementById("box-" + mid).classList.add("found");
            document.getElementById("output").textContent = `Found at index ${mid}`;
            return;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    document.getElementById("output").textContent = "Element not found!";
}

function highlightBoxes(low, high, mid) {
    document.querySelectorAll(".box").forEach(box => {
        box.classList.remove("low", "high", "mid", "found");
    });
    document.querySelectorAll(".arrow, .label").forEach(el => {
        el.style.display = "none";
    });

    if (low <= high) {
        document.getElementById("box-" + low).classList.add("low");
        document.getElementById("box-" + high).classList.add("high");
        document.getElementById("box-" + mid).classList.add("mid");

        document.getElementById("arrow-" + low).style.display = "block";
        document.getElementById("arrow-" + high).style.display = "block";
        document.getElementById("arrow-" + mid).style.display = "block";

        document.getElementById("label-" + low).textContent = "Low";
        document.getElementById("label-" + high).textContent = "High";
        document.getElementById("label-" + mid).textContent = "Mid";

        document.getElementById("label-" + low).style.display = "block";
        document.getElementById("label-" + high).style.display = "block";
        document.getElementById("label-" + mid).style.display = "block";
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

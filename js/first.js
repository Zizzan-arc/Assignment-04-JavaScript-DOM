let thrivingList = [];
let strugglingList = [];
let currentStatus = "all";

let total = document.getElementById("total");
let interviewingCount = document.getElementById("interviewCount");
let rejectingCount = document.getElementById("rejectCount");
let totalr = document.getElementById("total-right");

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilter = document.getElementById("interviewing-btn");
const rejectFilter = document.getElementById("rejecting-btn");

const allCardSection = document.getElementById("allCards");
const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filtered-section");

function calculateCount() {
  total.innerText = allCardSection.children.length; //3
  interviewingCount.innerText = thrivingList.length;
  rejectingCount.innerText = strugglingList.length;
  totalr.innerText = allCardSection.children.length;
}

calculateCount();

// step 1;
function toggleStyle(id) {
  // adding gray bg for all
  allFilterBtn.classList.add("bg-gray-400", "text-black");
  interviewFilter.classList.add("bg-gray-400", "text-black");
  rejectFilter.classList.add("bg-gray-400", "text-black");

  // if any button has black then remove
  allFilterBtn.classList.remove("bg-black", "text-white");
  interviewFilter.classList.remove("bg-black", "text-white");
  rejectFilter.classList.remove("bg-black", "text-white");

  // console.log(id);
  const selected = document.getElementById(id); //this is the button that clicked for filter

  currentStatus = id;
  console.log(currentStatus);
  // console.log(selected);

  // adding black bg for current button
  selected.classList.remove("bg-gray-400", "text-black");
  selected.classList.add("bg-black", "text-white");
  // step 1 finish

  // show and hidden particular section
  // step 4 start
  // filtering while clicking the filter button (All, Interviewing, Rejecting)
  if (id === "interviewing-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderThriving();
  } else if (id === "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
  } else if (id === "rejecting-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    renderStruggling();
  }
}

// step 2 delegation
mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-click-btn")) {
    const parenNode = event.target.parentNode.parentNode;

    const plantName = parenNode.querySelector(".plantName").innerText;
    const light = parenNode.querySelector(".light").innerText;
    const water = parenNode.querySelector(".water").innerText;
    const status = parenNode.querySelector(".status").innerText;
    const notes = parenNode.querySelector(".notes").innerText;
    const water2 = parenNode.querySelector(".water2").innerText;
    const latinName = parenNode.querySelector(".latinName").innerText;

    parenNode.querySelector(".status").innerText = "INTERVIEW";
  
    const cardInfo = {
      plantName,
      latinName,
      light,
      water,
      water2,
      status: "INTERVIEW",
      notes,
    };

    const plantExist = thrivingList.find(
      (item) => item.plantName == cardInfo.plantName,
    );

    if (!plantExist) {
      thrivingList.push(cardInfo);
    }

    // step 2 finish
    // removing the plant from struggling list
    strugglingList = strugglingList.filter(
      (item) => item.plantName != cardInfo.plantName,
    );

    // after remove rerender the html
    if (currentStatus == "rejecting-btn") {
      renderStruggling();
    }

    calculateCount();
  } else if (event.target.classList.contains("rejected-click-btn")) {
    const parenNode = event.target.parentNode.parentNode;

    const plantName = parenNode.querySelector(".plantName").innerText;
    const light = parenNode.querySelector(".light").innerText;
    const water = parenNode.querySelector(".water").innerText;
    const status = parenNode.querySelector(".status").innerText;
    const notes = parenNode.querySelector(".notes").innerText;
    const latinName = parenNode.querySelector(".latinName").innerText;
    const water2 = parenNode.querySelector(".water2").innerText;

    parenNode.querySelector(".status").innerText = "REJECTED";

    const cardInfo = {
      plantName,
      latinName,
      light,
      water,
      water2,
      status: "REJECTED",
      notes,
    };

    const plantExist = strugglingList.find(
      (item) => item.plantName == cardInfo.plantName,
    );

    if (!plantExist) {
      strugglingList.push(cardInfo);
    }

    // removing the plant from thriving list
    thrivingList = thrivingList.filter(
      (item) => item.plantName != cardInfo.plantName,
    );

    // console.log(thrivingList);

    // after remove rerender the html
    if (currentStatus == "interviewing-btn") {
      renderThriving();
    }
    calculateCount();
  }
});

// step 3  html file create
function renderThriving() {
  // make the filterSection empty every time
  filterSection.innerHTML = "";
   
  if(thrivingList.length===0){
    console.log("No jobs Available");
  }
  // crating innerHtml
  for (let thrive of thrivingList) {
    console.log(thrive);

    let div = document.createElement("div");
    div.className =
      "card flex justify-between border p-8 rounded-2xl bg-[#F1F2F4]";
    div.innerHTML = `
         <div class="space-y-6">
            <!-- part 1 -->
            <div>
              <p class="plantName text-4xl">${thrive.plantName}</p>
              <p class="latinName text-xl text-[#444e5e]">
                ${thrive.latinName}
              </p>
            </div>

            <!-- part 2 -->
            <div class="flex gap-2">
              <ul class="flex justify-between gap-7">
                <li class="light gap-2 text-[#444e5e]">${thrive.light}</li>
                <li class="water list-disc gap-2 text-[#444e5e]">${thrive.water}</li>
                <li class="water2 list-disc gap-2 text-[#444e5e]">
                  ${thrive.water2}
                </li>
              </ul>
            </div>
            <!-- part 3 -->
            <div class="flex">
              <p
                class="status border-2 p-2 bg-[#EEF4FF] text-[#002C5C] border-amber-400 rounded-xl"
              >
               ${thrive.status}
              </p>
            </div>
            <p class="notes text-[#444e5e] font-semibold">
             ${thrive.notes}
            </p>

            <!-- card buttons -->

            <div class="flex gap-5">
              <button
                class="interview-click-btn text-[#10B981] font-semibold border-2 px-4 py-2 uppercase rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#10B981]"
              >
                interview
              </button>
              <button
                class="rejected-click-btn text-[#EF4444] border-2 font-semibold px-4 py-2 uppercase rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#EF4444]"
              >
                rejected
              </button>
            </div>
          </div>

          <!-- main part 2 -->
          <div>
            <button
              class="btn-delete bg-transparent text-red-600 border-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#EF4444] "
            >
              Delete
            </button>
          </div>
        </div>
        `;
    filterSection.appendChild(div);
  }
}

function renderStruggling() {
  // make the filterSection empty every time

   if(strugglingList.length===0){
    console.log("No jobs Available");
  }
  filterSection.innerHTML = "";
  // crating innerHtml
  for (let struggle of strugglingList) {
    let div = document.createElement("div");
    div.className = "card flex justify-between border p-8";
    div.innerHTML = div.className =
      "card flex justify-between border p-8 rounded-2xl bg-[#F1F2F4]";
    div.innerHTML = `
         <div class="space-y-6">
            <!-- part 1 -->
            <div>
              <p class="plantName text-4xl">${struggle.plantName}</p>
              <p class="latinName text-xl text-[#444e5e]">
                ${struggle.latinName}
              </p>
            </div>

            <!-- part 2 -->
            <div class="flex gap-2">
              <ul class="flex justify-between gap-7">
                <li class="light gap-2 text-[#444e5e]">${struggle.light}</li>
                <li class="water list-disc gap-2 text-[#444e5e]">${struggle.water}</li>
                <li class="water2 list-disc gap-2 text-[#444e5e]">
                  ${struggle.water2}
                </li>
              </ul>
            </div>
            <!-- part 3 -->
            <div class="flex">
              <p
                class="status border-2 p-2 bg-[#EEF4FF] text-[#002C5C] border-amber-400 rounded-xl"
              >
               ${struggle.status}
              </p>
            </div>
            <p class="notes text-[#444e5e] font-semibold">
             ${struggle.notes}
            </p>

            <!-- card buttons -->

            <div class="flex gap-5">
              <button
                class="interview-click-btn text-[#10B981] font-semibold border-2 px-4 py-2 uppercase rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#10B981]"
              >
                interview
              </button>
              <button
                class="rejected-click-btn text-[#EF4444] border-2 font-semibold px-4 py-2 uppercase rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#EF4444]"
              >
                rejected
              </button>
            </div>
          </div>

          <!-- main part 2 -->
          <div>
            <button
              class="btn-delete bg-transparent text-red-600 border-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#EF4444] "
            >
              Delete
            </button>
          </div>
        </div>
        `;
    filterSection.appendChild(div);
  }
}

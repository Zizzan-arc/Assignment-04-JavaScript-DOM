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
const filterTabs = document.getElementById("filtered-tabs");

function calculateCount() {
  total.innerText = allCardSection.children.length; //3
  interviewingCount.innerText = thrivingList.length;
  rejectingCount.innerText = strugglingList.length;
  totalr.innerText = allCardSection.children.length;
  updateRightCount();
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
    filterTabs.classList.remove("hidden");
    renderThriving();
    updateRightCount();
  } else if (id === "all-filter-btn") {
    allCardSection.classList.remove("hidden");
    filterSection.classList.add("hidden");
    filterTabs.classList.add("hidden");
    updateRightCount();
  } else if (id === "rejecting-btn") {
    allCardSection.classList.add("hidden");
    filterSection.classList.remove("hidden");
    filterTabs.classList.remove("hidden");

    renderStruggling();
    updateRightCount();
  }
}

// step 2 delegation
mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interview-click-btn")) {
    const parentNode = event.target.parentNode.parentNode;

    const companyName = parentNode.querySelector(".companyName").innerText;
    const location = parentNode.querySelector(".location").innerText;
    const type = parentNode.querySelector(".type").innerText;
    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;
    const salary = parentNode.querySelector(".salary").innerText;
    const positionName = parentNode.querySelector(".positionName").innerText;

    parentNode.querySelector(".status").innerText = "INTERVIEW";

    const cardInfo = {
      companyName,
      positionName,
      location,
      type,
      salary,
      status: "INTERVIEW",
      notes,
    };

    const cExist = thrivingList.find(
      (item) => item.companyName == cardInfo.companyName,
    );

    if (!cExist) {
      thrivingList.push(cardInfo);
    }

    // step 2 finish
    // removing the plant from struggling list
    strugglingList = strugglingList.filter(
      (item) => item.companyName != cardInfo.companyName,
    );

    // after remove rerender the html
    if (currentStatus == "rejecting-btn") {
      renderStruggling();
    }

    calculateCount();
  } else if (event.target.classList.contains("rejected-click-btn")) {
    const parenNode = event.target.parentNode.parentNode;

    const companyName = parenNode.querySelector(".companyName").innerText;
    const location = parenNode.querySelector(".location").innerText;
    const type = parenNode.querySelector(".type").innerText;
    const status = parenNode.querySelector(".status").innerText;
    const notes = parenNode.querySelector(".notes").innerText;
    const positionName = parenNode.querySelector(".positionName").innerText;
    const salary = parenNode.querySelector(".salary").innerText;

    parenNode.querySelector(".status").innerText = "REJECTED";

    const cardInfo = {
      companyName,
      positionName,
      location,
      type,
      salary,
      status: "REJECTED",
      notes,
    };

    const cExist = strugglingList.find(
      (item) => item.companyName == cardInfo.companyName,
    );

    if (!cExist) {
      strugglingList.push(cardInfo);
    }

    // removing the plant from thriving list
    thrivingList = thrivingList.filter(
      (item) => item.companyName != cardInfo.companyName,
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
  filterTabs.innerHTML = "";

  if (thrivingList.length === 0) {
    let div = document.createElement("div");
    div.className =
      "flex flex-col items-center justify-center text-center p-10 bg-[#F1F2F4] rounded-xl min-h-screen";
    div.innerHTML = `
      <img src="./jobs.png" alt="" class="w-30 mb-4">
         
          <h2 class="text-[#002C5C] font-semibold text-3xl">No jobs available</h2>
          <p class="text-[#64748B] text-2xl font-medium">Check back soon for new job opportunities</p>
     
     `;
    filterTabs.appendChild(div);
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
              <p class="companyName text-4xl">${thrive.companyName}</p>
              <p class="positionName text-xl text-[#444e5e]">
                ${thrive.positionName}
              </p>
            </div>

            <!-- part 2 -->
            <div class="flex gap-2">
              <ul class="flex justify-between gap-7">
                <li class="location gap-2 text-[#444e5e]">${thrive.location}</li>
                <li class="type list-disc gap-2 text-[#444e5e]">${thrive.type}</li>
                <li class="salary list-disc gap-2 text-[#444e5e]">
                  ${thrive.salary}
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
  filterSection.innerHTML = "";

  filterTabs.innerHTML = "";

  if (strugglingList.length === 0) {
    let div = document.createElement("div");
    div.className =
      "flex flex-col items-center justify-center text-center p-10 bg-[#F1F2F4] rounded-xl min-h-screen";
    div.innerHTML = `
      <img src="./jobs.png" alt="" class="w-30 mb-4">
         
          <h2 class="text-[#002C5C] font-semibold text-3xl">No jobs available</h2>
          <p class="text-[#64748B] text-2xl font-medium">Check back soon for new job opportunities</p>
     
     `;
    filterTabs.appendChild(div);
  }

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
              <p class="companyName text-4xl">${struggle.companyName}</p>
              <p class="positionName text-xl text-[#444e5e]">
                ${struggle.positionName}
              </p>
            </div>

            <!-- part 2 -->
            <div class="flex gap-2">
              <ul class="flex justify-between gap-7">
                <li class="location gap-2 text-[#444e5e]">${struggle.location}</li>
                <li class="type list-disc gap-2 text-[#444e5e]">${struggle.type}</li>
                <li class="salary list-disc gap-2 text-[#444e5e]">
                  ${struggle.salary}
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

// dynamically update the rightCount value
function updateRightCount() {
  if (currentStatus === "all-filter-btn") {
    totalr.innerText = allCardSection.children.length + " jobs";
  } else if (currentStatus === "interviewing-btn") {
    totalr.innerText = thrivingList.length + " jobs";
  } else if (currentStatus === "rejecting-btn") {
    totalr.innerText = strugglingList.length + " jobs";
  }
}

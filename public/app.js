const tents = [
  "พี่ไผ่/51 car",
  "พี่เจน/Tk good car กาญจนา",
  "พี่ดา/ดาศรีนครินทร์",
  "พี่นนท์/NP Autotrade",
  "พี่พิม/Carwin",
  "พี่อั๋น/รถบ้านอำนวย",
  "พี่ต่อ/Nice cars",
  "พี่มาวิน/เฉลิมชัยรถบ้าน",
  "พี่โย/DDS",
  "พี่เล็ก/รถบ้านหลักหมื่น",
  "พี่บอล/โตโยต้านครปฐม",
  "พี่บอย/B Millenium",
  "พี่บี/Caf Garage",
  "พี่กิต/เจริญสิน CarAuto",
  "พี่โจ้/ลีลาคาร์ เซ็นเตอร์",
  "พี่โฟม/นายหน้า",
  "พี่แบงค์/D12 Auto",
  "พี่เหวิน/Euro car Gallery",
  "พี่เอ/ร้าน เอเซอร์วิส",
  "พี่บัลลังค์/เกรทวัน",
  "พี่แอร์/BD Bestdeal",
  "พี่โหน่ง/BN autocar",
  "พี่เพียว/67 การาจ",
  "พี่ฮั้ว/ฮั้ว ออโต้คาร์",
  "พี่เอ/โชคดี คาร์",
  "พี่แอน/พ.สามพราน",
  "พี่เด/นายหน้า",
  "พี่อิท/ICAR CHIANGMAI",
  "พี่ยุทธ/Car Exchange  Group",
  "พี่วิช/99 SmartCar",
  "พี่หมง/M2K",
  "พี่แซม/Sam Motors Thailand",
  "พี่กอล์ฟ/4Dท่าพระ",
  "พี่ตูน/Nine toon bb",
  "พี่อามมี่/AM Autocars",
  "พี่นุ๊ก/Ton Mortors",
  "พี่อนุ/Ainu Auto car",
  "พี่มิน/รถบ้านอินเตอร์",
  "พี่กร/นายหน้า",
  "พี่เน/นายหน้า",
  "พี่ก้อง/Kong Ultimate Motors",
  "พี่โอลาน/Olan UsedCars",
  "พี่โบ๊ท/Bigbull usedcar",
  "พี่คิตตี้/X Homecar",
  "พี่ปลา/นายหน้า",
  "พี่กานต์/Bk huas cars",
  "พี่รักษ์/รถบ้านฮอนด้า",
  "เอ็ม/ลิตเติ้ลบอย",
  "ลุย/TJ 69 SPEED",
  "ตี๋/TEE BIGCAR",
  "ณัฐ/KSB Auto กาญจนา",
  "แป๊ะ/นายหน้า",
  "พี่ตั้ม/บจก. เพชรยนต์",
  "พี่บอล/คาร์ทูไดฟ์",
  "บอย/G car",
  "กอล์ฟ/ธุรกิจยนต์ จ.ลำปาง",
  "เบ๊นท์/มิลลิเนียมมอเตอร์คาร์",
  "พี่บิว/รถซิ่งบางคุ๊",
  "พี่กันท์/ก้องยนต์",
  "พี่ต๋อง/เรสซิ่ง",
  "พี่โก้/โอเคยูสคาร์",
  "พี่ม่อน/นายหน้า",
  "พี่ต้อ/ไลอ้อนคาร์ รถมือสอง",
  "พี่ต้น/Double T Usedcar",
  "โอ๊ตเก้/ฝากขายรถบ้าน",
  "พี่นัส/นายหน้า",
  "พี่แอป/คาร์บัตเลอร์",
  "พี่เอก/KAPCAR ล็อต E9",
  "พี่สายฟ้า/รถบ้านขอนแก่น",
  "พี่ชาญ/ชาญณรงค์รถบ้าน",
  "พี่เจเจ/ก้าวเจริญ กู๊ดคาร์",
  "พี่อาร์ต/นายหน้า",
  "พี่ราชัน/รถบ้านราชัน",
  "พี่ภาพ/นายหน้า",
  "เฮียธนากร/เต๊นท์รถ ธนากร",
  "พี่มาวิน/สยามออร่า 168",
  "พี่โอ๊ค/CK AUTO SPORT",
  "พี่หนุ่ม/นายหน้า",
  "พี่นุ/ออโต้คาร์สระบุรี",
  "พี่ปอ/Open Road",
  "พี่ศิลป์/นายหน้า",
  "พี่เอกไทเกอร์/Tiger UsedCar",
  "พี่ใหม่/I SOLD CAR",
  "พี่ไนท์/N&B AutoCar",
  "พี่ตั้ม/PRM (นิว.พีอาร์เอ็ม)",
  "พี่แป๋ง/A lot of car",
  "พี่หนึ่ง/แสนรักรถซิ่ง",
  "พี่กบ/นายหน้า",
  "พี่ไผ่แมว/WRS AUTO กาญจนา",
  "พี่บอม/นายหน้า",
  "พี่ไก่/นายหน้า",
  "พี่เจ/SPN",
  "พี่โอม/รถบ้านสวนสยาม",
  "พี่เทม/นายหน้า",
  "พี่แอ้ม/Amm Car",
  "พี่เอกพีพี/ พีพี ออโต้เทรด",
  "พี่โอ๊ต/คาร์แอ็คชั่น",
  "อ็อฟ/รถบ้าน",
  "พี่อมร/นายหน้า",
  "พี่เชษฐ์/EXPRESS USEDCAR",
  "พี่โจ/รถบ้านบางแสน",
  "พี่สุ/รถบ้านคุณเอ",
  "พี่ปิยะ/168 Car",
  "พี่มีน/Im'meen Car",
  "พี่บิว/Triple V Quality car",
  "พี่หน่วย/ธวัชชัย คาร์",
  "พี่เน็ท/โอเค ออโต้คาร์",
  "พี่ตั้ม/คาร์ท ฟอยู",
  "พี่นิว/วรมน คาร์",
  "พี่ต้นกล้า/REAL GARAGE",
  "พี่อุ้ม/Go Go Car",
  "พี่ชัย/รถบ้านมีคุณ",
  "พี่เอฟ/FMS Auto car",
  "โบ๊ต/นายหน้า",
  "ไปป์/นายหน้า",
  "อ้วน/นายหน้า",
  "ปรีชา/K&P Auto car",
  "ปาร์ค/Parker Superbike",
  "ติ๊ก/ติ๊ก เต็นท์รถ",
  "นิค/นายหน้า",
  "พี่เล็ก/นายหน้า",
  "บจก.คาร์ซัม เซอทิไฟด์ (ประเทศไทย)/Carsome",
  "พี่นุ้ย/นายหน้า",
  "พี่หนิง/N Auto car",
  "พี่เอ็กซ์/X Auto Car",
  "ป็อบ/ป๊อปพีพีคาร์",
  "วู้ดดี้/Wooddy959 Goodcar",
  "พี่เบียร์ /เบียร์ ออโต้ คาร์",
  "พี่โต้ง/ดิเอ็กซ์คลูซีฟ มอเตอร์",
  "พี่บาส/2002 Autocar",
  "พี่นพ/รถบ้านฉัตรชัย",
  "พี่ตี๋ /ESTIMA-ALPHAD",
  "พี่เอ้/The great auto",
  "พี่แบม/Natee 168 Auto Point",
  "พี่นนท์/ รถซาก",
  "พี่เอก/369 Auto",
  "พี่กร/ซันนี่ Car",
  "พี่ฮุย/กัลปพฤกษ์ ยูสคาร์",
  "คุณมิค/ เฮง เฮง 101",
  "คุณนุ่น/ ภาษาเก๋ง โดยเก็กฮวย",
  "พี่เขต/เต้นท์ เขต ออโต้ คาร์",
  "พี่ต่าย/เฟิร์ส ออโต้",
  "พี่กวาง/โรดสเตอร์คาร์ พระราม5",
  "พี่นพทัต/บิวตี้ออร์โต้คาร์",
  "พี่นัทNL/NL ออโต้คาร์",
  "พี่กชอินทร์/kodchain car.com",
  "พี่ปราโมทย์/ทูพีเอ็ม ยูสคาร์",
  "พี่นุ้ย/NK  มหาชัย",
  "พี่ณรงค์/สัมฤทธิ์เจริญยนต์",
  "พี่ตี๋/ท็อปกัน",
  "พี่น็อต/Front 9 Auto",
  "พี่ตั้ม/PRM (นิว.พีอาร์เอ็ม)",
  "เสี่ยเอ/A57 Car Products",
  "พี่มานิตย์/รถบ้านหนามแดง",
  "พี่ตูน/Ninetoonbb",
  "พี่กอล์ฟ/เต๊นสมุทรปราการ",
  "พี่วีรกิจ/นายหน้า",
  "พี่ไทเกอร์/Car Z Gen",
  "พี่พวัส/นายหน้า",
  "พี่เชอรี่/เต๊นท์9 รถมือ2",
  "พี่คอปเตอร์/คอปเตอร์ เรซซิ่ง",
  "พี่ไบรอั้น/เศรษฐี คาร์",
  "พี่พี/Pe Auto",
  "พี่บอลวี/นายหน้า",
  "พี่บี/นายหน้า",
  "พี่มาร์ค/D Car",
  "พี่โดม/มาริโอ มอเตอร์",
  "พี่โอ๊ต/CK auto car",
  "พี่มนตรี/KIK AUTO CAR",
  "พี่แบงค์/BanK Home Car",
  "พี่บุญเลิศ/โชว์รูมบุญเลิศยนตรการ",
  "พี่อี๊ด/นายหน้า",
  "พี่ขงเบ้ง/ขงเบ้ง กู๊ดคาร์",
  "พี่เก่ง/นายหน้า",
  "พี่โจ/Icar",
  "พี่นุ้ย/ส.สุนันท์",
  "พี่เอ้/โชคดีคาร์",
  "พี่อุเทน/รถบ้าน สายไหม",
  "พี่ดอท/รุ่งเรื่อง รถบ้าน",
  "พี่ปักเป้า/107motor",
  "พี่จิ๋ว/รถบ้านลลิล",
  "พี่ชาญ/รถบ้านแฝด",
  "พี่โบ๊ต/โบ๊ต ออโต้ คาร์",
  "พี่กบ/kk Auto",
  "พี่บูม/Bk Premium car",
  "พี่บอล/ธนา คาร์",
  "พี่นัท/TT LINE CAR",
  "พี่ไพฑูรย์ /รถปกป้อง รถบ้าน",
  "พี่โป้ง/TKS Auto",
  "พี่ตี๋/ตี๋รถบ้าน นครนายก",
  "พี่ดีน/โอชิน ออโต้คาร์",
  "พี่หวัง/สมหวัง ออโต้ คาร์",
  "พี่เอก/เอก ออโต้ คาร์",
  "พี่สมหวัง/เซียนรถ",
  "พี่ต้น/ชัวยูสคาร์",
  "พี่โจ๊ก/ยูโดยูสคาร์",
  "พี่เช/ปริ๊นยูสคาร์",
  "พี่ต้น/ที เอ็น ออโต้คาร์",
  "พี่หนุ่ม/ยนตการ",
  "ตั้ม/15 ออโต้ คาร์",
  "พี่BB/นาฬิ คาร์",
  "พี่เต้ย/ TypeCars",
  "พี่กิจชัย/เต็นท์ A.C Auto​ car",
  "พี่เนย/นายหน้า",
  "พี่ลูกกรอก/ธนาทรัพย์",
  "พี่ตุ๊กตา/ตุ๊กตา @รถบ้านลาดกระบัง",
  "พี่บอส/Boss car345",
  "พี่เยา/รถบ้านคุณเอ็กซ์",
  "พี่แบงค์/Trusty  Auto  Trade",
  "พี่ณัฐพล/นายหน้า",
  "พี่ณัฏฐ์/DN  autocars",
  "พี่แชมป์/300 Garage",
  "พี่วุฒิ/วุฒิ ดับเบิ้ลยู มอเตอร์",
  "พี่บิ๊ก/ดีที่สุด คาร์แอนด์เซอร์วิสสระแก้ว",
  "พี่แบงค์/bank benz autocars",
  "พี่ฟิวส์/ช้างเผือก คาร์เซ็นเตอร์",
  "พี่ต้น/Ton Motor",
  "คุณเอิร์ธ/Champ Earth Motor",
  "พี่อั่น/The  Best  One Motor",
  "พี่ดรีม/นายหน้า",
  "พี่โหน่ง/ธนบูลย์ ออโต้คาร์",
  "พี่นิด/พรทิพย์ ออโตคาร์",
  "พี่แซม/ทีซี ออโต้เฮาส์ จำกัด",
  "พี่เจมส์/พรีเมียร์ ออโต้",
  "พี่เอก/PKK Smartcar",
  "พี่เอ็ม/MK  MOTOR  TRADE",
  "พี่เอก/นายหน้า",
  "พี่ปู/รถบ้านสุวิทย์",
  "พี่อาม/นายหน้า",
  "พี่โอ๋/เอวา คาร์",
  "พี่แบงค์/โย รัชดา",
  "คุณสุรณี/เอส ดับบลิว เอส เบสท์เซอร์วิส จำกัด",
  "เฮียหมี/Exchange Center",
  "พี่โต้ง/รถบ้าน มงคล",
  "พี่หยี/K.B AUTO",
  "พี่มอเตอร์/ จิวออโต้คาร์",
  "พี่เรียว/นายหน้า",
  "พี่แมน/คุณพ้ง",
  "น้องครีม รถซาก/นายหน้า",
  "พี่เปรม/ราชบุรีชัวร์คาร์",
  "พี่คิว/ScanCar",
  "พี่สุรเดช/ ดีดี  ออตโต้",
  "พี่หย๊ง/สินปัญญา เต็นท์",
  "พี่ท็อป/เต็นท์รถเจ๊โอ๋",
  "พี่ชัช/85 MOTOR",
  "เฮียเปี๊ยก/A.R.Autocar",
  "พี่โจ/โจออโต้คาร์",
  "พี่โจ้/นายหน้า",
  "พี่บาส/N.B.P.",
  "พี่นิว/RJ Premium Car",
  "พี่กอล์ฟ/นายหน้า",
  "พี่แบน/นายหน้า",
  "พี่โหน่ง/JC Autocar",
  "พี่พิพัฒน์/Usedshopauto",
  "คุณเมย์/นายหน้า",
  "พี่แตม/คาร์ทูเฟรนด์",
  "คุณนัท/สิทธิ์ออโต้",
  "พี่กอล์ฟ จิรายุ/นายหน้า",
  "พี่โทนี่/Vigo4u",
  "พี่เจมส์/ซิมเพิ้ดออโต้เทรด",
  "พี่ไกด์/Guide Usedcars",
  "พี่เบิร์ด/นายหน้า",
  "พี่พีช/84 Carcenter"
];

const $serviceDate = document.getElementById("serviceDate");
const $serviceDateMenu = document.getElementById("serviceDateMenu");
const $plate = document.getElementById("plate");
const $plateMenu = document.getElementById("plateMenu");
const $plateSearch = document.getElementById("plateSearch");
const $plateOptions = document.getElementById("plateOptions");
const $branch = document.getElementById("branch");
const $model = document.getElementById("model");
const $price = document.getElementById("price");
const $tentName = document.getElementById("tentName");
const $tentNameMenu = document.getElementById("tentNameMenu");
const $tentNameSearch = document.getElementById("tentNameSearch");
const $tentNameOptions = document.getElementById("tentNameOptions");
const $dealStatus = document.getElementById("dealStatus");
const $dealStatusMenu = document.getElementById("dealStatusMenu");
const $submit = document.getElementById("submit");
const $reset = document.getElementById("reset");
const $status = document.getElementById("status");

function createDropdown({ triggerEl, menuEl, placeholder, searchInputEl, optionsContainerEl }) {
  const container = triggerEl.closest(".dropdown");
  const optionsContainer = optionsContainerEl || menuEl;
  let options = [];
  let filteredOptions = [];
  let value = "";

  function updateTriggerText() {
    triggerEl.textContent = value || placeholder;
    triggerEl.dataset.value = value || "";
  }

  function close() {
    container.classList.remove("open");
    triggerEl.setAttribute("aria-expanded", "false");
  }

  function open() {
    if (triggerEl.disabled) return;
    container.classList.add("open");
    triggerEl.setAttribute("aria-expanded", "true");
    if (searchInputEl) {
      searchInputEl.value = "";
      filterOptions("");
      searchInputEl.focus();
    }
  }

  function toggle() {
    if (container.classList.contains("open")) close();
    else open();
  }

  function renderMenu() {
    optionsContainer.innerHTML = "";
    for (const optionValue of filteredOptions) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "dropdown-option";
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", optionValue === value ? "true" : "false");
      button.textContent = optionValue;
      button.addEventListener("click", () => {
        setValue(optionValue);
        close();
        triggerEl.dispatchEvent(new Event("change"));
      });
      optionsContainer.appendChild(button);
    }
  }

  function filterOptions(query) {
    const q = String(query || "").trim().toLowerCase();
    if (!q) {
      filteredOptions = options.slice();
    } else {
      filteredOptions = options.filter((o) => String(o).toLowerCase().includes(q));
    }
    renderMenu();
  }

  function setOptions(nextOptions) {
    options = Array.isArray(nextOptions) ? nextOptions : [];
    filteredOptions = options.slice();
    if (value && !options.includes(value)) value = "";
    updateTriggerText();
    renderMenu();
  }

  function setValue(nextValue) {
    value = String(nextValue || "");
    updateTriggerText();
    filteredOptions = options.slice();
    renderMenu();
  }

  function clear() {
    value = "";
    updateTriggerText();
    filteredOptions = options.slice();
    renderMenu();
  }

  function setDisabled(disabled) {
    triggerEl.disabled = Boolean(disabled);
    if (triggerEl.disabled) close();
  }

  function getValue() {
    return triggerEl.dataset.value || "";
  }

  triggerEl.addEventListener("click", toggle);
  triggerEl.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
    if (e.key === "Enter" || e.key === " ") toggle();
  });

  if (searchInputEl) {
    searchInputEl.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        triggerEl.focus();
      }
    });
    searchInputEl.addEventListener("input", () => {
      filterOptions(searchInputEl.value);
    });
  }

  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) close();
  });

  updateTriggerText();
  filteredOptions = options.slice();
  renderMenu();

  return { setOptions, setValue, clear, setDisabled, getValue, close, filterOptions };
}

const serviceDateDropdown = createDropdown({
  triggerEl: $serviceDate,
  menuEl: $serviceDateMenu,
  placeholder: "เลือกวันที่"
});

const plateDropdown = createDropdown({
  triggerEl: $plate,
  menuEl: $plateMenu,
  placeholder: "เลือกทะเบียน",
  searchInputEl: $plateSearch,
  optionsContainerEl: $plateOptions
});

const tentNameDropdown = createDropdown({
  triggerEl: $tentName,
  menuEl: $tentNameMenu,
  placeholder: "เลือกชื่อเต็นท์",
  searchInputEl: $tentNameSearch,
  optionsContainerEl: $tentNameOptions
});

const dealStatusDropdown = createDropdown({
  triggerEl: $dealStatus,
  menuEl: $dealStatusMenu,
  placeholder: "เลือกสถานะ"
});

function setStatus(text, type) {
  $status.classList.remove("error", "ok");
  if (type) $status.classList.add(type);
  $status.textContent = text || "";
}

function formatWithCommas(value) {
  const digits = value.replace(/[^\d]/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function fetchJson(url) {
  const response = await fetch(url);
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json.error || `HTTP ${response.status}`);
  }
  return json;
}

async function loadDates() {
  setStatus("กำลังโหลดวันที่...");
  serviceDateDropdown.setDisabled(true);
  plateDropdown.setDisabled(true);
  $submit.disabled = true;
  try {
    const { dates } = await fetchJson("/api/dates");
    serviceDateDropdown.setOptions(dates);
    serviceDateDropdown.clear();
    serviceDateDropdown.setDisabled(false);
    setStatus("");
  } catch (error) {
    setStatus(`โหลดวันที่ไม่สำเร็จ: ${String(error.message || error)}`, "error");
  }
}

async function loadPlatesForDate(date) {
  plateDropdown.setDisabled(true);
  $submit.disabled = true;
  $branch.value = "";
  $model.value = "";
  if (!date) {
    plateDropdown.setOptions([]);
    plateDropdown.clear();
    return;
  }

  setStatus("กำลังโหลดทะเบียน...");
  try {
    const { plates } = await fetchJson(`/api/plates?date=${encodeURIComponent(date)}`);
    plateDropdown.setOptions(plates);
    plateDropdown.clear();
    plateDropdown.setDisabled(false);
    setStatus("");
  } catch (error) {
    setStatus(`โหลดทะเบียนไม่สำเร็จ: ${String(error.message || error)}`, "error");
  }
}

async function loadCaseDetail({ date, plate }) {
  $branch.value = "";
  $model.value = "";
  $submit.disabled = true;
  if (!date || !plate) return;

  setStatus("กำลังโหลดรายละเอียดเคส...");
  try {
    const { case: caseData } = await fetchJson(
      `/api/case?date=${encodeURIComponent(date)}&plate=${encodeURIComponent(plate)}`
    );
    $branch.value = caseData.branch || "";
    $model.value = caseData.model || "";
    setStatus("");
    maybeEnableSubmit();
  } catch (error) {
    setStatus(`โหลดรายละเอียดไม่สำเร็จ: ${String(error.message || error)}`, "error");
  }
}

function maybeEnableSubmit() {
  const date = serviceDateDropdown.getValue();
  const plate = plateDropdown.getValue();
  const price = $price.value;
  const tentName = tentNameDropdown.getValue();
  const dealStatus = dealStatusDropdown.getValue();
  const hasCase = Boolean($branch.value || $model.value);
  $submit.disabled = !(date && plate && price && tentName && dealStatus && hasCase);
}

function resetForm() {
  serviceDateDropdown.clear();
  plateDropdown.setOptions([]);
  plateDropdown.clear();
  plateDropdown.setDisabled(true);
  $branch.value = "";
  $model.value = "";
  $price.value = "";
  tentNameDropdown.clear();
  dealStatusDropdown.clear();
  $submit.disabled = true;
  setStatus("");
}

async function submitForm() {
  const payload = {
    date: serviceDateDropdown.getValue(),
    plate: plateDropdown.getValue(),
    price: $price.value,
    tentName: tentNameDropdown.getValue(),
    status: dealStatusDropdown.getValue()
  };

  setStatus("กำลังบันทึก...");
  $submit.disabled = true;

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(json.error || `HTTP ${response.status}`);

    setStatus("บันทึกสำเร็จ", "ok");
    $price.value = "";
    tentNameDropdown.clear();
    dealStatusDropdown.clear();
  } catch (error) {
    setStatus(`บันทึกไม่สำเร็จ: ${String(error.message || error)}`, "error");
  } finally {
    maybeEnableSubmit();
  }
}

function initTents() {
  tentNameDropdown.setOptions(tents);
  tentNameDropdown.clear();
}

function initDealStatus() {
  dealStatusDropdown.setOptions(["พร้อมโอน", "ดูรถ"]);
  dealStatusDropdown.clear();
}

$serviceDate.addEventListener("change", async () => {
  await loadPlatesForDate(serviceDateDropdown.getValue());
  maybeEnableSubmit();
});

$plate.addEventListener("change", async () => {
  await loadCaseDetail({ date: serviceDateDropdown.getValue(), plate: plateDropdown.getValue() });
  maybeEnableSubmit();
});

$price.addEventListener("input", () => {
  const formatted = formatWithCommas($price.value);
  if ($price.value !== formatted) {
    const selectionStart = $price.selectionStart;
    const selectionEnd = $price.selectionEnd;
    $price.value = formatted;
    if (selectionStart != null && selectionEnd != null) {
      $price.setSelectionRange(selectionStart, selectionEnd);
    }
  }
  maybeEnableSubmit();
});

$tentName.addEventListener("change", maybeEnableSubmit);
$dealStatus.addEventListener("change", maybeEnableSubmit);
$reset.addEventListener("click", resetForm);
$submit.addEventListener("click", submitForm);

initTents();
initDealStatus();
loadDates();

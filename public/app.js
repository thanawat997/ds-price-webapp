const fallbackTents = [
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

const SALE_STATUS_OPTIONS = [
  "ไม่สะดวกเพิ่มเงิน",
  "คาดหวังเกินราคาขาย",
  "ราคามาไม่แรง",
  "แห่เช็คราคา",
  "นายหน้า",
  "รถบริษัท",
  "ไม่พร้อมจอด",
  "ติดต่อไม่ได้",
  "ขายที่อื่น",
  "รอแก้ไขสภาพ",
  "ไม่มีอัพเดทจากสาขา",
  "รายงานไม่ตรง",
  "ปิดการขาย"
];

function getSaleStatusClass(value) {
  const text = String(value || "").trim();
  if (!text) return "status-empty";
  if (["ไม่สะดวกเพิ่มเงิน", "คาดหวังเกินราคาขาย", "ราคามาไม่แรง"].includes(text)) return "status-pink";
  if (["แห่เช็คราคา", "รอแก้ไขสภาพ"].includes(text)) return "status-yellow";
  if (["นายหน้า", "รถบริษัท"].includes(text)) return "status-purple";
  if (["ไม่พร้อมจอด", "ติดต่อไม่ได้", "ขายที่อื่น"].includes(text)) return "status-red";
  if (text === "ไม่มีอัพเดทจากสาขา") return "status-dark";
  if (text === "รายงานไม่ตรง") return "status-brown";
  if (text === "ปิดการขาย") return "status-green";
  return "status-gray";
}

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
const $manageTents = document.getElementById("manageTents");
const $tentsModal = document.getElementById("tentsModal");
const $closeTentsModal = document.getElementById("closeTentsModal");
const $newTentName = document.getElementById("newTentName");
const $addTent = document.getElementById("addTent");
const $tentsTable = document.getElementById("tentsTable");
const $tentsModalStatus = document.getElementById("tentsModalStatus");
const $testMode = document.getElementById("testMode");
const $carsView = document.getElementById("carsView");
const $chartView = document.getElementById("chartView");
const $priceView = document.getElementById("priceView");
const $sheetTabs = document.getElementById("sheetTabs");
const $openCarsView = document.getElementById("openCarsView");
const $openPriceForm = document.getElementById("openPriceForm");
const $openFinalForm = document.getElementById("openFinalForm");
const $openChartView = document.getElementById("openChartView");
const $backToCars = document.getElementById("backToCars");
const $carsStatus = document.getElementById("carsStatus");
const $carsCount = document.getElementById("carsCount");
const $carsTableBody = document.getElementById("carsTableBody");
const $chartDateSelect = document.getElementById("chartDateSelect");
const $chartStatus = document.getElementById("chartStatus");
const $chartSummary = document.getElementById("chartSummary");
const $chartBranches = document.getElementById("chartBranches");
const $finalNoteRow = document.getElementById("finalNoteRow");
const $finalNote = document.getElementById("finalNote");
const $finalModal = document.getElementById("finalModal");
const $closeFinalModal = document.getElementById("closeFinalModal");
const $cancelFinalWindow = document.getElementById("cancelFinalWindow");
const $saveFinalWindow = document.getElementById("saveFinalWindow");
const $deleteFinalWindow = document.getElementById("deleteFinalWindow");
const $finalModalStatus = document.getElementById("finalModalStatus");
const $finalCarSummary = document.getElementById("finalCarSummary");
const $finalDate = document.getElementById("finalDate");
const $finalStartTime = document.getElementById("finalStartTime");
const $finalEndTime = document.getElementById("finalEndTime");

let currentFormMode = "normal";
let biddingCarsCache = [];
let activeFinalCars = [];
let selectedFinalCarForModal = null;
let remainingTimer = null;
let carsRefreshTimer = null;
let cellPopoverTimer = null;
let activeEditableCell = null;

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

async function fetchJsonWithOptions(url, options) {
  const response = await fetch(url, options);
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(json.error || `HTTP ${response.status}`);
  }
  return json;
}

function setTentsModalStatus(text, type) {
  $tentsModalStatus.classList.remove("error", "ok");
  if (type) $tentsModalStatus.classList.add(type);
  $tentsModalStatus.textContent = text || "";
}

function openTentsModal() {
  $tentsModal.classList.add("open");
  $tentsModal.setAttribute("aria-hidden", "false");
  setTentsModalStatus("");
  refreshTentsTable();
  $newTentName.value = "";
  $newTentName.focus();
}

function closeTentsModal() {
  $tentsModal.classList.remove("open");
  $tentsModal.setAttribute("aria-hidden", "true");
}

function createEl(tag, attrs) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (key === "className") el.className = value;
      else if (key === "text") el.textContent = value;
      else if (key.startsWith("on") && typeof value === "function") el.addEventListener(key.slice(2).toLowerCase(), value);
      else el.setAttribute(key, value);
    }
  }
  return el;
}

function showView(viewName) {
  const isPrice = viewName === "price";
  const isChart = viewName === "chart";
  const isCars = viewName === "cars";
  $carsView.hidden = isPrice;
  $chartView.hidden = !isChart;
  $carsView.hidden = isPrice || isChart;
  $priceView.hidden = !isPrice;
  $openCarsView.classList.toggle("active", isCars);
  $openChartView.classList.toggle("active", isChart);
  $sheetTabs.classList.toggle("chart-active", isChart);
  $openCarsView.setAttribute("aria-selected", String(isCars));
  $openChartView.setAttribute("aria-selected", String(isChart));
  document.title = isPrice ? "บันทึกราคา" : isChart ? "ชาทราคา" : "รายการรถ";
}

function setFormMode(mode) {
  currentFormMode = mode === "final" ? "final" : "normal";
  const isFinal = currentFormMode === "final";
  document.getElementById("priceTitle").textContent = isFinal ? "บันทึกราคา Final" : "บันทึกราคา";
  $submit.textContent = isFinal ? "บันทึก Final" : "บันทึก";
  $finalNoteRow.hidden = !isFinal;
  if (!isFinal) $finalNote.value = "";
}

function navigateTo(viewName) {
  window.location.hash = viewName === "price" ? "price" : viewName === "chart" ? "chart" : "cars";
  showView(viewName);
}

function syncViewFromHash() {
  const viewName = window.location.hash === "#price" ? "price" : window.location.hash === "#chart" ? "chart" : "cars";
  showView(viewName);
  if (viewName === "cars") refreshBiddingCarsSilently();
}

function setCarsStatus(text, type) {
  $carsStatus.classList.remove("error");
  if (type) $carsStatus.classList.add(type);
  $carsStatus.textContent = text || "";
}

function displayValue(value) {
  const text = String(value || "").trim();
  return text || "-";
}

function normalizeNumberText(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const normalized = text.replace(/,/g, "");
  const number = Number(normalized);
  if (!Number.isFinite(number)) return text;
  return number.toLocaleString("th-TH");
}

function parseNumber(value) {
  const number = Number(String(value || "").trim().replace(/,/g, ""));
  return Number.isFinite(number) ? number : null;
}

function isGoodDsPrice(car) {
  const expected = parseNumber(car.expectedPrice);
  const dsMax = parseNumber(car.dsMaxPrice);
  if (expected == null || expected <= 0 || dsMax == null) return false;
  return dsMax >= expected - 50000;
}

function hasPriceValue(value, options = {}) {
  const text = String(value || "").trim();
  if (!text) return false;
  const number = parseNumber(text);
  if (number == null) return false;
  if (options.zeroAsEmpty && number === 0) return false;
  return true;
}

function formatPriceValue(value, options = {}) {
  if (!hasPriceValue(value, options)) return "-";
  return normalizeNumberText(value);
}

function parseServiceDate(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return null;
  return {
    day: Number(match[1]),
    month: Number(match[2]),
    year: Number(match[3])
  };
}

function isTodayServiceDate(value) {
  const parsed = parseServiceDate(value);
  if (!parsed) return false;
  const now = new Date();
  return parsed.day === now.getDate() && parsed.month === now.getMonth() + 1 && parsed.year === now.getFullYear();
}

function getPriceCellClass(baseClass, value, options = {}) {
  return [baseClass, hasPriceValue(value, options) ? "" : "price-empty"].filter(Boolean).join(" ");
}

function getBranchClass(branchName) {
  const text = String(branchName || "").trim();
  if (text.includes("บางนา")) return "branch-bangna";
  if (text.includes("สะพานควาย")) return "branch-saphan";
  return "";
}

function appendCell(row, value, className) {
  const cell = createEl("td", { text: displayValue(value) });
  if (className) cell.className = className;
  cell.dataset.fullText = displayValue(value);
  row.appendChild(cell);
  return cell;
}

function appendEditableCell(row, car, field, value, type) {
  const displayText = type === "price" ? formatPriceValue(value) : displayValue(value);
  const cell = appendCell(row, displayText, `editable-cell editable-${type}`);
  cell.dataset.field = field;
  cell.dataset.editorType = type;
  cell.dataset.primaryKey = car.primaryKey || `${car.plate || ""} ${car.serviceDate || ""}`.trim();
  cell.dataset.rawValue = String(value || "").trim();
  return cell;
}

function renderStatusCellContent(cell, value) {
  const text = String(value || "").trim();
  cell.innerHTML = "";
  cell.appendChild(createEl("span", {
    className: `sale-status-pill ${getSaleStatusClass(text)}`,
    text: text || "-"
  }));
  cell.dataset.rawValue = text;
  cell.dataset.fullText = text || "-";
}

function appendSaleStatusCell(row, car) {
  const cell = createEl("td", { className: "editable-cell sale-status-cell" });
  cell.dataset.field = "saleStatus";
  cell.dataset.editorType = "status";
  cell.dataset.primaryKey = car.primaryKey || `${car.plate || ""} ${car.serviceDate || ""}`.trim();
  renderStatusCellContent(cell, car.saleStatus);
  row.appendChild(cell);
  return cell;
}

function getFinalState(final) {
  if (!final || !final.startIso || !final.endIso) return "empty";
  const now = Date.now();
  const start = Date.parse(final.startIso);
  const end = Date.parse(final.endIso);
  if (!Number.isFinite(start) || !Number.isFinite(end)) return "set";
  if (now >= start && now <= end) return "active";
  if (now > end) return "ended";
  return "set";
}

function formatFinalDateForList(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return text || "-";
  return `${match[3]}/${match[2]}/${match[1]}`;
}

function formatFinalWindowText(final) {
  if (!final || !final.finalDate || !final.startTime || !final.endTime) return "-";
  return `${formatFinalDateForList(final.finalDate)};${final.startTime}-${final.endTime}`;
}

function formatRemainingMs(ms) {
  if (!Number.isFinite(ms) || ms <= 0) return "-";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
  return `${pad2(minutes)}:${pad2(seconds)}`;
}

function getRemainingText(final) {
  const state = getFinalState(final);
  if (state === "ended") return "✓";
  if (state !== "active") return "-";
  return formatRemainingMs(Date.parse(final.endIso) - Date.now());
}

function calendarIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2v4"></path>
      <path d="M16 2v4"></path>
      <rect x="3" y="4" width="18" height="18" rx="2"></rect>
      <path d="M3 10h18"></path>
    </svg>
  `;
}

function appendFinalCell(row, car) {
  const cell = createEl("td", { className: "final-cell" });
  const state = getFinalState(car.final);
  const button = createEl("button", {
    className: `calendar-button final-${state === "empty" ? "empty" : state}`,
    type: "button",
    "aria-label": `ตั้งเวลา Final ${car.plate || ""}`,
    title: car.final ? `${car.final.finalDate || ""} ${car.final.startTime || ""}-${car.final.endTime || ""}` : "ตั้งเวลา Final",
    onClick: () => openFinalModal(car)
  });
  button.innerHTML = calendarIconSvg();
  cell.appendChild(button);
  row.appendChild(cell);
}

function appendFinalWindowCells(row, car) {
  appendCell(row, formatFinalWindowText(car.final), "final-window-cell");
  const remaining = createEl("td", { className: "remaining-cell center-cell", text: getRemainingText(car.final) });
  if (car.final?.endIso) remaining.dataset.endIso = car.final.endIso;
  if (car.final?.startIso) remaining.dataset.startIso = car.final.startIso;
  row.appendChild(remaining);
}

function setRemainingCellState(cell, ms, active) {
  cell.classList.remove("final-active", "final-warning", "final-danger", "final-done");
  if (!active) return;
  if (ms < 5 * 60 * 1000) {
    cell.classList.add("final-danger");
  } else {
    cell.classList.add("final-active");
  }
}

function updateRemainingCells() {
  const cells = document.querySelectorAll(".remaining-cell[data-start-iso][data-end-iso]");
  for (const cell of cells) {
    const start = Date.parse(cell.dataset.startIso || "");
    const end = Date.parse(cell.dataset.endIso || "");
    const now = Date.now();
    const active = Number.isFinite(start) && Number.isFinite(end) && now >= start && now <= end;
    const ended = Number.isFinite(end) && now > end;
    const remainingMs = end - now;
    cell.textContent = active ? formatRemainingMs(remainingMs) : ended ? "✓" : "-";
    setRemainingCellState(cell, remainingMs, active);
    cell.classList.toggle("final-done", ended);
  }
}

function renderCars(cars) {
  $carsTableBody.innerHTML = "";
  const list = Array.isArray(cars) ? cars : [];
  biddingCarsCache = list;
  if ($carsCount) $carsCount.textContent = `${list.length.toLocaleString("th-TH")} รายการ`;

  if (list.length === 0) {
    const row = createEl("tr");
    const cell = createEl("td", { className: "empty-state", text: "ไม่มีรายการรถ" });
    cell.colSpan = 25;
    row.appendChild(cell);
    $carsTableBody.appendChild(row);
    return;
  }

  for (const car of list) {
    const row = createEl("tr");
    row.dataset.primaryKey = car.primaryKey || `${car.plate || ""} ${car.serviceDate || ""}`.trim();
    appendCell(row, car.serviceDate, ["primary-cell center-cell", isTodayServiceDate(car.serviceDate) ? "today-service-cell" : ""].filter(Boolean).join(" "));
    appendCell(row, car.branch, ["primary-cell", getBranchClass(car.branch)].filter(Boolean).join(" "));
    appendCell(row, car.location, "center-cell");
    appendCell(row, car.plate, "primary-cell");
    appendCell(row, car.brand);
    appendCell(row, car.model);
    appendCell(row, car.subModel);
    appendCell(row, car.year, "muted-cell center-cell");
    appendCell(row, normalizeNumberText(car.mileage), "muted-cell");
    appendCell(row, car.fuel);
    appendCell(row, car.condition, "center-cell");
    const goodPriceClass = isGoodDsPrice(car) ? " good-price" : "";
    appendCell(row, formatPriceValue(car.expectedPrice, { zeroAsEmpty: true }), getPriceCellClass(`price-cell expected-price-cell${goodPriceClass}`, car.expectedPrice, { zeroAsEmpty: true }));
    appendCell(row, formatPriceValue(car.dsMaxPrice), getPriceCellClass(`price-cell${goodPriceClass}`, car.dsMaxPrice));
    appendCell(row, formatPriceValue(car.finalMaxPrice), getPriceCellClass("price-cell final-max-price-cell", car.finalMaxPrice));
    appendCell(row, car.remark);
    appendFinalCell(row, car);
    appendFinalWindowCells(row, car);
    appendSaleStatusCell(row, car);
    appendEditableCell(row, car, "purchasePrice", car.purchasePrice, "price");
    appendEditableCell(row, car, "purchaseDate", car.purchaseDate, "date");
    appendEditableCell(row, car, "salePrice", car.salePrice, "price");
    appendEditableCell(row, car, "saleDate", car.saleDate, "date");
    appendEditableCell(row, car, "mechanicReport", car.mechanicReport, "mechanic");
    appendEditableCell(row, car, "closeTentCode", car.closeTentCode, "text");
    $carsTableBody.appendChild(row);
  }
  updateRemainingCells();
  if (!remainingTimer) remainingTimer = setInterval(updateRemainingCells, 1000);
}

async function loadBiddingCars() {
  setCarsStatus("กำลังโหลดรายการรถ...");
  try {
    const { cars } = await fetchJson("/api/bidding-cars?limit=50");
    renderCars(cars);
    setCarsStatus("");
  } catch (error) {
    renderCars([]);
    setCarsStatus(`โหลดรายการรถไม่สำเร็จ: ${String(error.message || error)}`, "error");
  }
}

async function refreshBiddingCarsSilently() {
  if (document.hidden || window.location.hash === "#price" || window.location.hash === "#chart") return;
  try {
    const { cars } = await fetchJson("/api/bidding-cars?limit=50");
    patchCarsInPlace(cars);
    setCarsStatus("");
  } catch (error) {
    setCarsStatus(`อัปเดทรายการรถไม่สำเร็จ: ${String(error.message || error)}`, "error");
  }
}

function patchCarsInPlace(cars) {
  const list = Array.isArray(cars) ? cars : [];
  if ($carsTableBody.querySelector("tr[data-primary-key]") == null || list.length !== biddingCarsCache.length) {
    renderCars(list);
    return;
  }
  biddingCarsCache = list;
  for (const car of list) {
    const primaryKey = car.primaryKey || `${car.plate || ""} ${car.serviceDate || ""}`.trim();
    const row = $carsTableBody.querySelector(`tr[data-primary-key="${CSS.escape(primaryKey)}"]`);
    if (!row) {
      renderCars(list);
      return;
    }
    const updates = {
      saleStatus: car.saleStatus || "-",
      purchasePrice: formatPriceValue(car.purchasePrice),
      purchaseDate: displayValue(car.purchaseDate),
      salePrice: formatPriceValue(car.salePrice),
      saleDate: displayValue(car.saleDate),
      mechanicReport: displayValue(car.mechanicReport),
      closeTentCode: displayValue(car.closeTentCode)
    };
    for (const [field, text] of Object.entries(updates)) {
      const cell = row.querySelector(`td[data-field="${field}"]`);
      if (!cell || cell.querySelector("input, select, textarea")) continue;
      if (cell.textContent.trim() !== text) {
        if (field === "saleStatus") renderStatusCellContent(cell, text === "-" ? "" : text);
        else cell.textContent = text;
        cell.dataset.fullText = text;
        cell.classList.add("cell-updated");
        setTimeout(() => cell.classList.remove("cell-updated"), 900);
      }
    }
  }
  updateRemainingCells();
}

function startCarsAutoRefresh() {
  if (carsRefreshTimer) return;
  carsRefreshTimer = setInterval(refreshBiddingCarsSilently, 30000);
}

function setButtonLoading(button, loading) {
  if (!button) return;
  button.classList.toggle("loading", loading);
  button.setAttribute("aria-busy", String(loading));
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && window.location.hash !== "#price" && window.location.hash !== "#chart") refreshBiddingCarsSilently();
});

function getCellPopover() {
  let popover = document.querySelector(".cell-popover");
  if (!popover) {
    popover = createEl("div", { className: "cell-popover", role: "tooltip" });
    document.body.appendChild(popover);
  }
  return popover;
}

function hideCellPopover() {
  const popover = document.querySelector(".cell-popover");
  if (popover) popover.classList.remove("open");
}

function showCellPopover(cell, event) {
  const text = String(cell.dataset.fullText || cell.textContent || "").trim();
  if (!text || text === "-") return;
  const popover = getCellPopover();
  popover.textContent = text;
  popover.classList.add("open");
  const margin = 12;
  const rect = popover.getBoundingClientRect();
  const left = Math.min(event.clientX + margin, window.innerWidth - rect.width - margin);
  const top = Math.min(event.clientY + margin, window.innerHeight - rect.height - margin);
  popover.style.left = `${Math.max(margin, left)}px`;
  popover.style.top = `${Math.max(margin, top)}px`;
  clearTimeout(cellPopoverTimer);
  cellPopoverTimer = setTimeout(hideCellPopover, 3600);
}

function parseDisplayDateToInput(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (!match) return "";
  return `${match[3]}-${pad2(match[2])}-${pad2(match[1])}`;
}

function formatInputDateForDisplay(value) {
  const text = String(value || "").trim();
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return text;
  return `${match[3]}/${match[2]}/${match[1]}`;
}

async function saveEditableCell(cell, value) {
  const field = cell.dataset.field;
  const primaryKey = cell.dataset.primaryKey;
  cell.classList.add("saving");
  try {
    await fetchJsonWithOptions("/api/bidding-cells", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ primaryKey, field, value })
    });
    const type = cell.dataset.editorType;
    const display = type === "price" ? formatPriceValue(value) : type === "date" ? formatInputDateForDisplay(value) || "-" : displayValue(value);
    if (type === "status") renderStatusCellContent(cell, value);
    else cell.textContent = display;
    cell.dataset.rawValue = String(value || "").trim();
    cell.dataset.fullText = display;
  } catch (error) {
    cell.textContent = `ผิดพลาด`;
    cell.dataset.fullText = `บันทึกไม่สำเร็จ: ${String(error.message || error)}`;
    setTimeout(() => {
      const type = cell.dataset.editorType;
      const raw = cell.dataset.rawValue || "";
      if (type === "status") renderStatusCellContent(cell, raw);
      else cell.textContent = type === "price" ? formatPriceValue(raw) : displayValue(raw);
    }, 900);
  } finally {
    cell.classList.remove("saving");
    if (activeEditableCell === cell) activeEditableCell = null;
  }
}

function startEditableCell(cell) {
  if (!cell || cell.querySelector("input, select, textarea")) return;
  const type = cell.dataset.editorType;
  const rawValue = cell.dataset.rawValue || "";
  let initialEditorValue = type === "date" ? parseDisplayDateToInput(rawValue) : rawValue;
  activeEditableCell = cell;
  hideCellPopover();
  cell.textContent = "";
  let editor;
  if (type === "status") {
    editor = createEl("select", { className: "cell-editor" });
    editor.appendChild(createEl("option", { value: "", text: "-" }));
    for (const option of SALE_STATUS_OPTIONS) editor.appendChild(createEl("option", { value: option, text: option }));
    editor.value = initialEditorValue;
  } else if (type === "mechanic") {
    editor = createEl("select", { className: "cell-editor" });
    editor.appendChild(createEl("option", { value: "", text: "-" }));
    editor.appendChild(createEl("option", { value: "รายงานสภาพตรงตามที่ช่างรายงาน", text: "สภาพตรงตามรายงาน" }));
    editor.appendChild(createEl("option", { value: "__custom__", text: "สภาพไม่ตรงตามที่รายงาน" }));
    editor.value = rawValue === "รายงานสภาพตรงตามที่ช่างรายงาน" ? rawValue : rawValue ? "__custom__" : "";
    initialEditorValue = editor.value;
  } else {
    editor = createEl("input", { className: "cell-editor", type: type === "date" ? "date" : "text" });
    editor.value = initialEditorValue;
    if (type === "price") editor.inputMode = "numeric";
  }
  cell.appendChild(editor);
  editor.focus();
  if (editor.select) editor.select();

  let finished = false;
  const restore = () => {
    if (type === "status") renderStatusCellContent(cell, rawValue);
    else cell.textContent = type === "price" ? formatPriceValue(rawValue) : type === "date" ? displayValue(rawValue) : displayValue(rawValue);
    if (activeEditableCell === cell) activeEditableCell = null;
  };
  const finish = async ({ force = false } = {}) => {
    if (finished) return;
    let value = editor.value;
    if (!force && value === initialEditorValue) {
      finished = true;
      restore();
      return;
    }
    finished = true;
    if (type === "mechanic" && value === "__custom__") {
      value = window.prompt("กรอกรายละเอียดสภาพไม่ตรงตามที่รายงาน", rawValue && rawValue !== "รายงานสภาพตรงตามที่ช่างรายงาน" ? rawValue : "") || "";
    }
    if (type === "price") value = formatWithCommas(value);
    await saveEditableCell(cell, value);
  };
  editor.addEventListener("change", () => finish({ force: true }), { once: true });
  editor.addEventListener("blur", () => {
    setTimeout(() => finish(), 80);
  }, { once: true });
  editor.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      finish({ force: true });
    }
    if (event.key === "Escape") {
      finished = true;
      restore();
    }
  });
}

function setChartStatus(text, type) {
  $chartStatus.classList.remove("error", "ok");
  if (type) $chartStatus.classList.add(type);
  $chartStatus.textContent = text || "";
}

function extractTimeText(timestamp) {
  const text = String(timestamp || "").trim();
  const match = text.match(/\b(\d{1,2}):(\d{2})(?::\d{2})?\b/);
  if (!match) return "";
  return `${pad2(match[1])}:${match[2]}`;
}

function renderChartDateOptions(dates) {
  $chartDateSelect.innerHTML = "";
  for (const date of dates || []) {
    const option = createEl("option", { value: date, text: date });
    $chartDateSelect.appendChild(option);
  }
}

function renderChartSummary(totals) {
  const items = [
    ["เข้ารับบริการ", totals?.cars || 0],
    ["จำนวนการใส่ราคาทั้งหมด", totals?.totalBids ?? (Number(totals?.bids || 0) + Number(totals?.finalBids || 0))],
    ["เปิดFinal", totals?.finalWindows || 0]
  ];
  $chartSummary.innerHTML = "";
  for (const [label, value] of items) {
    const tile = createEl("div", { className: "summary-tile" });
    tile.appendChild(createEl("div", { className: "summary-label", text: label }));
    tile.appendChild(createEl("div", { className: "summary-value", text: Number(value).toLocaleString("th-TH") }));
    $chartSummary.appendChild(tile);
  }
}

function renderBidLine(bid, options) {
  const line = createEl("div", { className: `bid-line${options?.isFinal ? " final-bid" : ""}` });
  const statusText = `${displayValue(bid.status)}${options?.isFinal && options?.hasFinalWindow ? " 🚨" : ""}`;
  line.appendChild(createEl("span", { className: "bid-tent", text: displayValue(bid.tentName) }));
  line.appendChild(createEl("span", { className: "bid-price", text: normalizeNumberText(bid.price) }));
  line.appendChild(createEl("span", { className: "bid-time", text: extractTimeText(bid.timestamp) || "-" }));
  line.appendChild(createEl("span", { className: "bid-status", text: statusText }));
  return line;
}

function renderChartDashboard(dashboard) {
  renderChartSummary(dashboard?.totals || {});
  $chartBranches.innerHTML = "";
  const incomingBranches = dashboard?.branches || [];
  const branchByType = new Map();
  for (const branch of incomingBranches) {
    if (getBranchClass(branch.branch) === "branch-bangna") branchByType.set("branch-bangna", branch);
    else if (getBranchClass(branch.branch) === "branch-saphan") branchByType.set("branch-saphan", branch);
  }
  const otherBranches = incomingBranches.filter((branch) => !["branch-bangna", "branch-saphan"].includes(getBranchClass(branch.branch)));
  const branches = [
    branchByType.get("branch-bangna") || { branch: "002 Lotus บางนา", cars: [] },
    branchByType.get("branch-saphan") || { branch: "004 Big C สะพานควาย", cars: [] },
    ...otherBranches
  ];

  for (const branch of branches) {
    const panel = createEl("section", { className: "branch-panel" });
    const branchClass = getBranchClass(branch.branch);
    const header = createEl("div", { className: ["branch-header", branchClass].filter(Boolean).join(" ") });
    header.appendChild(createEl("div", { className: "branch-title", text: branch.branch || "ไม่ระบุสาขา" }));
    header.appendChild(createEl("div", { className: "branch-count", text: `${(branch.cars || []).length} คัน` }));
    panel.appendChild(header);
    if ((branch.cars || []).length === 0) {
      panel.appendChild(createEl("div", { className: "chart-empty branch-empty", text: "ไม่มีข้อมูลรถสำหรับวันที่นี้" }));
      $chartBranches.appendChild(panel);
      continue;
    }

    for (let index = 0; index < (branch.cars || []).length; index += 1) {
      const car = branch.cars[index];
      const carCard = createEl("article", { className: "chart-car" });
      const title = createEl("div", { className: "chart-car-title" });
      const meta = [
        car.mileage ? `ไมล์ ${normalizeNumberText(car.mileage)}` : "",
        car.expectedPrice ? `คาดหวัง ${normalizeNumberText(car.expectedPrice)}` : "",
        car.maxFinalPrice ? `Final ${normalizeNumberText(car.maxFinalPrice)}` : ""
      ].filter(Boolean);
      const mainLine = createEl("div", { className: "chart-car-main" });
      mainLine.appendChild(document.createTextNode(`${index + 1}. ${displayValue(car.plate)} : ${displayValue(car.model)}`));
      if (meta.length > 0) {
        mainLine.appendChild(createEl("span", { className: "chart-car-inline-meta", text: ` · ${meta.join(" · ")}` }));
      }
      title.appendChild(mainLine);
      carCard.appendChild(title);

      const layout = createEl("div", { className: "chart-bid-layout" });
      const countBox = createEl("div", { className: "bid-count-box" });
      countBox.appendChild(createEl("div", { className: "bid-count-label", text: "ผู้ใส่ราคา" }));
      countBox.appendChild(createEl("div", { className: "bid-count-value", text: String(car.bidCount || 0) }));
      layout.appendChild(countBox);

      const bidList = createEl("div", { className: "bid-list" });
      const bids = [...(car.regularBids || [])].sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
      const finalBids = [...(car.finalBids || [])].sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
      if (bids.length === 0 && finalBids.length === 0) {
        bidList.appendChild(createEl("div", { className: "bid-line", text: "ยังไม่มีราคา" }));
      } else {
        for (const bid of bids) bidList.appendChild(renderBidLine(bid));
        for (const bid of finalBids) bidList.appendChild(renderBidLine(bid, { isFinal: true, hasFinalWindow: car.hasFinalWindow }));
      }
      layout.appendChild(bidList);
      carCard.appendChild(layout);
      panel.appendChild(carCard);
    }
    $chartBranches.appendChild(panel);
  }
}

async function loadChartDates() {
  const { dates } = await fetchJson("/api/dates");
  renderChartDateOptions(dates);
  return dates || [];
}

async function loadPriceChart(date) {
  const selectedDate = String(date || $chartDateSelect.value || "").trim();
  if (!selectedDate) return;
  setChartStatus("กำลังโหลดชาทราคา...");
  try {
    const { dashboard } = await fetchJson(`/api/price-dashboard?date=${encodeURIComponent(selectedDate)}`);
    renderChartDashboard(dashboard);
    setChartStatus("");
  } catch (error) {
    $chartSummary.innerHTML = "";
    $chartBranches.innerHTML = "";
    setChartStatus(`โหลดชาทราคาไม่สำเร็จ: ${String(error.message || error)}`, "error");
  }
}

async function openChartView() {
  navigateTo("chart");
  try {
    if ($chartDateSelect.options.length === 0) {
      const dates = await loadChartDates();
      if (dates.length > 0) $chartDateSelect.value = dates[0];
    }
    await loadPriceChart($chartDateSelect.value);
  } catch (error) {
    setChartStatus(`โหลดวันที่ไม่สำเร็จ: ${String(error.message || error)}`, "error");
  }
}

function pad2(number) {
  return String(number).padStart(2, "0");
}

function formatDateInput(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function formatTimeInput(date) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

function addMinutesToTime(dateValue, timeValue, minutes) {
  const [hour, minute] = String(timeValue || "00:00").split(":").map((v) => Number(v));
  const date = dateValue ? new Date(`${dateValue}T00:00:00`) : new Date();
  date.setHours(Number.isFinite(hour) ? hour : 0, Number.isFinite(minute) ? minute : 0, 0, 0);
  date.setMinutes(date.getMinutes() + minutes);
  return formatTimeInput(date);
}

function setFinalModalStatus(text, type) {
  $finalModalStatus.classList.remove("error", "ok");
  if (type) $finalModalStatus.classList.add(type);
  $finalModalStatus.textContent = text || "";
}

function openFinalModal(car) {
  selectedFinalCarForModal = car;
  $finalModal.classList.add("open");
  $finalModal.setAttribute("aria-hidden", "false");
  setFinalModalStatus("");
  const model = [car.brand, car.model, car.subModel, car.year].filter(Boolean).join(" ");
  $finalCarSummary.innerHTML = `<strong>${displayValue(car.plate)}</strong> ${displayValue(model)}<br>${displayValue(car.branch)} · ${displayValue(car.serviceDate)}`;

  const now = new Date();
  $finalDate.value = car.final?.finalDate || formatDateInput(now);
  $finalStartTime.value = car.final?.startTime || formatTimeInput(now);
  $finalEndTime.value = car.final?.endTime || addMinutesToTime($finalDate.value, $finalStartTime.value, 30);
  $deleteFinalWindow.disabled = !car.final;
}

function closeFinalModal() {
  $finalModal.classList.remove("open");
  $finalModal.setAttribute("aria-hidden", "true");
  selectedFinalCarForModal = null;
}

async function saveFinalWindow() {
  if (!selectedFinalCarForModal) return;
  $saveFinalWindow.disabled = true;
  setButtonLoading($saveFinalWindow, true);
  setFinalModalStatus("กำลังบันทึกเวลา Final...");
  try {
    await fetchJsonWithOptions("/api/final-windows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        car: selectedFinalCarForModal,
        finalDate: $finalDate.value,
        startTime: $finalStartTime.value,
        endTime: $finalEndTime.value,
        testMode: Boolean($testMode && $testMode.checked)
      })
    });
    setFinalModalStatus("บันทึกเวลา Final สำเร็จ", "ok");
    await loadBiddingCars();
    setTimeout(closeFinalModal, 400);
  } catch (error) {
    setFinalModalStatus(`บันทึกไม่สำเร็จ: ${String(error.message || error)}`, "error");
  } finally {
    setButtonLoading($saveFinalWindow, false);
    $saveFinalWindow.disabled = false;
  }
}

async function deleteFinalWindow() {
  if (!selectedFinalCarForModal || !selectedFinalCarForModal.final) return;
  $deleteFinalWindow.disabled = true;
  $saveFinalWindow.disabled = true;
  setButtonLoading($deleteFinalWindow, true);
  setFinalModalStatus("กำลังยกเลิกการเปิดไฟนอล...");
  try {
    await fetchJsonWithOptions(
      `/api/final-windows?date=${encodeURIComponent(selectedFinalCarForModal.serviceDate)}&plate=${encodeURIComponent(selectedFinalCarForModal.plate)}`,
      { method: "DELETE" }
    );
    setFinalModalStatus("ยกเลิกการเปิดไฟนอลสำเร็จ", "ok");
    await loadBiddingCars();
    setTimeout(closeFinalModal, 400);
  } catch (error) {
    setFinalModalStatus(`ยกเลิกไม่สำเร็จ: ${String(error.message || error)}`, "error");
    $deleteFinalWindow.disabled = false;
  } finally {
    setButtonLoading($deleteFinalWindow, false);
    $saveFinalWindow.disabled = false;
  }
}

async function loadActiveFinalCars() {
  const { cars } = await fetchJson("/api/final-cars");
  activeFinalCars = Array.isArray(cars) ? cars : [];
  return activeFinalCars;
}

function getActiveFinalPlatesByDate(date) {
  return activeFinalCars
    .filter((car) => car.serviceDate === date)
    .map((car) => car.plate)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "th-TH"));
}

function findActiveFinalCar({ date, plate }) {
  return activeFinalCars.find((car) => car.serviceDate === date && car.plate === plate) || null;
}

async function openFinalFormWithCar(car) {
  setFormMode("final");
  resetForm({ keepTestMode: true });
  setStatus("กำลังโหลดรายการ Final...");
  try {
    await loadActiveFinalCars();
    const dates = Array.from(new Set(activeFinalCars.map((item) => item.serviceDate).filter(Boolean)));
    serviceDateDropdown.setOptions(dates);
    serviceDateDropdown.setDisabled(false);
    if (car) {
      serviceDateDropdown.setValue(car.serviceDate);
      plateDropdown.setOptions(getActiveFinalPlatesByDate(car.serviceDate));
      plateDropdown.setDisabled(false);
      plateDropdown.setValue(car.plate);
      $branch.value = car.branch || "";
      $model.value = [car.brand, car.model, car.subModel, car.year].filter(Boolean).join(" ");
    } else if (activeFinalCars.length === 1) {
      const only = activeFinalCars[0];
      serviceDateDropdown.setValue(only.serviceDate);
      plateDropdown.setOptions(getActiveFinalPlatesByDate(only.serviceDate));
      plateDropdown.setDisabled(false);
      plateDropdown.setValue(only.plate);
      $branch.value = only.branch || "";
      $model.value = [only.brand, only.model, only.subModel, only.year].filter(Boolean).join(" ");
    } else {
      serviceDateDropdown.clear();
      plateDropdown.setOptions([]);
      plateDropdown.clear();
      plateDropdown.setDisabled(true);
    }
    setStatus(activeFinalCars.length ? "" : "ยังไม่มีรถที่อยู่ในช่วงเวลา Final", activeFinalCars.length ? undefined : "error");
    maybeEnableSubmit();
    navigateTo("price");
  } catch (error) {
    setStatus(`โหลดรายการ Final ไม่สำเร็จ: ${String(error.message || error)}`, "error");
    navigateTo("price");
  }
}

function renderTentsTable(tents) {
  $tentsTable.innerHTML = "";

  const header = createEl("div", { className: "tents-row header" });
  header.appendChild(createEl("div", { text: "Code" }));
  header.appendChild(createEl("div", { text: "ชื่อเต็นท์" }));
  header.appendChild(createEl("div", { text: "" }));
  $tentsTable.appendChild(header);

  for (const tent of tents) {
    const row = createEl("div", { className: "tents-row" });
    const codeEl = createEl("div", { className: "tents-code", text: tent.code || "" });
    const nameInput = createEl("input", { className: "input", type: "text", value: tent.name || "" });

    const actions = createEl("div", { className: "tents-actions" });
    const saveBtn = createEl("button", { className: "button", type: "button", text: "บันทึก" });
    const deleteBtn = createEl("button", { className: "button danger", type: "button", text: "ลบ" });

    saveBtn.addEventListener("click", async () => {
      const nextName = String(nameInput.value || "").trim();
      if (!nextName) {
        setTentsModalStatus("กรุณากรอกชื่อเต็นท์", "error");
        return;
      }
      saveBtn.disabled = true;
      deleteBtn.disabled = true;
      try {
        await fetchJsonWithOptions(`/api/tents/${encodeURIComponent(tent.code)}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: nextName })
        });
        setTentsModalStatus("บันทึกสำเร็จ", "ok");
        await refreshTentsTable();
        await loadTentsIntoDropdown();
      } catch (error) {
        setTentsModalStatus(`บันทึกไม่สำเร็จ: ${String(error.message || error)}`, "error");
      } finally {
        saveBtn.disabled = false;
        deleteBtn.disabled = false;
      }
    });

    deleteBtn.addEventListener("click", async () => {
      if (!confirm(`ลบเต็นท์ "${tent.name}" (${tent.code}) ?`)) return;
      saveBtn.disabled = true;
      deleteBtn.disabled = true;
      try {
        await fetchJsonWithOptions(`/api/tents/${encodeURIComponent(tent.code)}`, { method: "DELETE" });
        setTentsModalStatus("ลบสำเร็จ", "ok");
        await refreshTentsTable();
        await loadTentsIntoDropdown();
      } catch (error) {
        setTentsModalStatus(`ลบไม่สำเร็จ: ${String(error.message || error)}`, "error");
      } finally {
        saveBtn.disabled = false;
        deleteBtn.disabled = false;
      }
    });

    actions.appendChild(saveBtn);
    actions.appendChild(deleteBtn);

    row.appendChild(codeEl);
    row.appendChild(nameInput);
    row.appendChild(actions);
    $tentsTable.appendChild(row);
  }
}

async function refreshTentsTable() {
  try {
    setTentsModalStatus("กำลังโหลดรายชื่อเต็นท์...");
    const { tents } = await fetchJson("/api/tents");
    renderTentsTable(tents);
    setTentsModalStatus("");
  } catch (error) {
    setTentsModalStatus(`โหลดรายชื่อเต็นท์ไม่สำเร็จ: ${String(error.message || error)}`, "error");
  }
}

async function loadTentsIntoDropdown() {
  try {
    const { tents } = await fetchJson("/api/tents");
    tentNameDropdown.setOptions((tents || []).map((t) => t.name).filter(Boolean));
    tentNameDropdown.clear();
    return;
  } catch (_error) {
    tentNameDropdown.setOptions(fallbackTents);
    tentNameDropdown.clear();
  }
}

async function loadDates() {
  if (currentFormMode === "final") return;
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

  if (currentFormMode === "final") {
    const plates = getActiveFinalPlatesByDate(date);
    plateDropdown.setOptions(plates);
    plateDropdown.clear();
    plateDropdown.setDisabled(plates.length === 0);
    setStatus(plates.length ? "" : "ไม่มีทะเบียนที่อยู่ในช่วงเวลา Final สำหรับวันที่นี้", plates.length ? undefined : "error");
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

  if (currentFormMode === "final") {
    const car = findActiveFinalCar({ date, plate });
    if (!car) {
      setStatus("ทะเบียนนี้ไม่ได้อยู่ในช่วงเวลา Final", "error");
      return;
    }
    $branch.value = car.branch || "";
    $model.value = [car.brand, car.model, car.subModel, car.year].filter(Boolean).join(" ");
    setStatus("");
    maybeEnableSubmit();
    return;
  }

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
  const hasFinalNote = currentFormMode !== "final" || Boolean(String($finalNote.value || "").trim());
  $submit.disabled = !(date && plate && price && tentName && dealStatus && hasCase && hasFinalNote);
}

function resetForm(options) {
  const keepStatus = Boolean(options && options.keepStatus);
  const keepTestMode = Boolean(options && options.keepTestMode);
  const statusText = $status.textContent || "";
  const statusType = $status.classList.contains("error") ? "error" : $status.classList.contains("ok") ? "ok" : "";

  serviceDateDropdown.clear();
  plateDropdown.setOptions([]);
  plateDropdown.clear();
  plateDropdown.setDisabled(true);
  $branch.value = "";
  $model.value = "";
  $price.value = "";
  $finalNote.value = "";
  tentNameDropdown.clear();
  dealStatusDropdown.clear();
  if (!keepTestMode && $testMode) $testMode.checked = false;
  $submit.disabled = true;
  if (keepStatus) setStatus(statusText, statusType || undefined);
  else setStatus("");
}

async function submitForm() {
  const payload = {
    date: serviceDateDropdown.getValue(),
    plate: plateDropdown.getValue(),
    price: $price.value,
    tentName: tentNameDropdown.getValue(),
    status: dealStatusDropdown.getValue(),
    note: String($finalNote.value || "").trim(),
    testMode: Boolean($testMode && $testMode.checked)
  };

  setStatus("กำลังบันทึก...");
  $submit.disabled = true;

  try {
    const response = await fetch(currentFormMode === "final" ? "/api/submit-final" : "/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const json = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(json.error || `HTTP ${response.status}`);

    setStatus(currentFormMode === "final" ? "บันทึก Final สำเร็จ" : "บันทึกสำเร็จ", "ok");
    resetForm({ keepStatus: true, keepTestMode: true });
    if (currentFormMode === "final") await loadActiveFinalCars();
    await loadBiddingCars();
  } catch (error) {
    setStatus(`บันทึกไม่สำเร็จ: ${String(error.message || error)}`, "error");
  } finally {
    maybeEnableSubmit();
  }
}

function initTents() {
  loadTentsIntoDropdown();
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
$finalNote.addEventListener("input", maybeEnableSubmit);
$reset.addEventListener("click", resetForm);
$submit.addEventListener("click", submitForm);
$manageTents.addEventListener("click", openTentsModal);
$openCarsView.addEventListener("click", () => navigateTo("cars"));
$openPriceForm.addEventListener("click", async () => {
  setFormMode("normal");
  resetForm({ keepTestMode: true });
  await loadDates();
  navigateTo("price");
});
$openChartView.addEventListener("click", openChartView);
$chartDateSelect.addEventListener("change", () => loadPriceChart($chartDateSelect.value));
$openFinalForm.addEventListener("click", () => openFinalFormWithCar(null));
$backToCars.addEventListener("click", () => navigateTo("cars"));
window.addEventListener("hashchange", syncViewFromHash);
$carsTableBody.addEventListener("click", (event) => {
  if (event.target.closest("button")) return;
  const cell = event.target.closest("td");
  if (!cell || !$carsTableBody.contains(cell)) return;
  if (cell.classList.contains("editable-cell")) {
    startEditableCell(cell);
    return;
  }
  showCellPopover(cell, event);
});
document.addEventListener("click", (event) => {
  if (event.target.closest(".cars-table td")) return;
  if (activeEditableCell) {
    const editor = activeEditableCell.querySelector("input, select, textarea");
    if (editor) editor.blur();
  }
  hideCellPopover();
});
document.addEventListener("mousedown", (event) => {
  if (!activeEditableCell) return;
  if (activeEditableCell.contains(event.target)) return;
  const editor = activeEditableCell.querySelector("input, select, textarea");
  if (editor) editor.blur();
}, true);
window.addEventListener("scroll", hideCellPopover, true);
$finalStartTime.addEventListener("change", () => {
  $finalEndTime.value = addMinutesToTime($finalDate.value, $finalStartTime.value, 30);
});
$closeFinalModal.addEventListener("click", closeFinalModal);
$cancelFinalWindow.addEventListener("click", closeFinalModal);
$saveFinalWindow.addEventListener("click", saveFinalWindow);
$deleteFinalWindow.addEventListener("click", deleteFinalWindow);
$finalModal.addEventListener("click", (e) => {
  const isBackdrop = e.target && e.target.getAttribute && e.target.getAttribute("data-close") === "true";
  if (isBackdrop) closeFinalModal();
});
$closeTentsModal.addEventListener("click", closeTentsModal);
$tentsModal.addEventListener("click", (e) => {
  const isBackdrop = e.target && e.target.getAttribute && e.target.getAttribute("data-close") === "true";
  if (isBackdrop) closeTentsModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $tentsModal.classList.contains("open")) closeTentsModal();
  if (e.key === "Escape" && $finalModal.classList.contains("open")) closeFinalModal();
});

$addTent.addEventListener("click", async () => {
  const name = String($newTentName.value || "").trim();
  if (!name) {
    setTentsModalStatus("กรุณากรอกชื่อเต็นท์", "error");
    return;
  }
  $addTent.disabled = true;
  try {
    await fetchJsonWithOptions("/api/tents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    $newTentName.value = "";
    setTentsModalStatus("เพิ่มสำเร็จ", "ok");
    await refreshTentsTable();
    await loadTentsIntoDropdown();
  } catch (error) {
    setTentsModalStatus(`เพิ่มไม่สำเร็จ: ${String(error.message || error)}`, "error");
  } finally {
    $addTent.disabled = false;
  }
});

$newTentName.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    $addTent.click();
  }
});

initTents();
initDealStatus();
loadDates();
syncViewFromHash();
loadBiddingCars();
startCarsAutoRefresh();
if (window.location.hash === "#chart") openChartView();

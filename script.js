// Хранит название заведения
let placeName = '';

// Элемент даты в PDF
const pdfDate = document.getElementById('pdfDate');

// Получаем элементы формы с проверкой на существование
const placeNameInput = document.getElementById('placeNameInput');
const conceptSelect = document.getElementById('conceptSelect');
const serviceFormatSelect = document.getElementById('serviceFormatSelect');
const installationSelect = document.getElementById('installationSelect');
const exclusiveModeSelect = document.getElementById('exclusiveMode');
const iikoWebRightsSelect = document.getElementById('iikoWebRights');
const deliverySelect = document.getElementById('deliverySelect');
const authMethodsSelect = document.getElementById('authMethods');

// Элементы для вывода пояснений
const conceptNote = document.getElementById('conceptNote');
const serviceFormatNote = document.getElementById('serviceFormatNote');
const deliveryNote = document.getElementById('deliveryNote');
const authMethodsNote = document.getElementById('authMethodsNote');

// Значения выбранных опций
let conceptValue = '';
let serviceFormatValue = '';
let deliveryValue = '';
let authMethodsValues = [];

// === Новый блок для Количество накладных и дополнительных параметров ===
const invoiceCountInput = document.getElementById('deliveryInvoiceCount');
const deliveryPaymentOnSendCheckbox = document.getElementById('deliveryPaymentOnSend');
const autoDeliveryCookingCheckbox = document.getElementById('autoDeliveryCooking');
const deliveryConfirmationCheckbox = document.getElementById('deliveryConfirmation');
const cartographyCheckbox = document.getElementById('cartography');

if (invoiceCountInput) invoiceCountInput.addEventListener('input', renderPreview);
if (deliveryPaymentOnSendCheckbox) deliveryPaymentOnSendCheckbox.addEventListener('change', renderPreview);
if (autoDeliveryCookingCheckbox) autoDeliveryCookingCheckbox.addEventListener('change', renderPreview);
if (deliveryConfirmationCheckbox) deliveryConfirmationCheckbox.addEventListener('change', renderPreview);
if (cartographyCheckbox) cartographyCheckbox.addEventListener('change', renderPreview);

// === Новый блок для списка оборудования ===
const equipmentListInput = document.getElementById('equipmentList');
let equipmentValue = '';

if (equipmentListInput) {
  equipmentListInput.addEventListener('input', e => {
    equipmentValue = e.target.value.trim();
    renderPreview();
  });
}

// === Новый блок для списка складов ===
const storageListInput = document.getElementById('storageList');
let storageValue = '';

if (storageListInput) {
  storageListInput.addEventListener('input', e => {
    storageValue = e.target.value.trim();
    renderPreview();
  });
}

// === Новый блок для Мест приготовления ===
const prepTable = document.getElementById('prepPlacesTable');
const prepCell = document.getElementById('prepPlacesCell');
let prepRowCount = 1;

const addPrepRowBtn = document.getElementById('addPrepRow');
const removePrepRowBtn = document.getElementById('removePrepRow');

if (addPrepRowBtn) {
  addPrepRowBtn.addEventListener('click', () => {
    const row = prepTable.insertRow(-1);
    for (let i = 0; i < 4; i++) {
      const cell = row.insertCell(i);
      cell.contentEditable = "true";
    }
    prepRowCount++;
    prepCell.rowSpan = prepRowCount;
    renderPreview();
  });
}

if (removePrepRowBtn) {
  removePrepRowBtn.addEventListener('click', () => {
    if (prepRowCount > 1) {
      prepTable.deleteRow(-1);
      prepRowCount--;
      prepCell.rowSpan = prepRowCount;
      renderPreview();
    }
  });
}

// === Новый блок для Опций кухни ===
const chefTerminalsCheckbox = document.getElementById('chefTerminals');
const secondScreensCheckbox = document.getElementById('secondScreens');
const electronicQueuesCheckbox = document.getElementById('electronicQueues');
const integratedScalesCheckbox = document.getElementById('integratedScales');

if (chefTerminalsCheckbox) {
  chefTerminalsCheckbox.addEventListener('change', renderPreview);
}
if (secondScreensCheckbox) {
  secondScreensCheckbox.addEventListener('change', renderPreview);
}
if (electronicQueuesCheckbox) {
  electronicQueuesCheckbox.addEventListener('change', renderPreview);
}
if (integratedScalesCheckbox) {
  integratedScalesCheckbox.addEventListener('change', renderPreview);
}

// === Новый блок для Типы оплат ===
const paymentTypesTable = document.getElementById('paymentTypesTable');
const paymentTypesCell = document.getElementById('paymentTypesCell');
let paymentRowCount = 1;

const addPaymentRowBtn = document.getElementById('addPaymentRow');
const removePaymentRowBtn = document.getElementById('removePaymentRow');

if (addPaymentRowBtn) {
  addPaymentRowBtn.addEventListener('click', () => {
    const row = paymentTypesTable.insertRow(-1);
    for (let i = 0; i < 5; i++) {
      const cell = row.insertCell(i);
      if (i === 1 || i === 2 || i === 3) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        cell.appendChild(checkbox);
      } else {
        cell.contentEditable = "true";
      }
    }
    paymentRowCount++;
    paymentTypesCell.rowSpan = paymentRowCount;
    renderPreview();
  });
}

if (removePaymentRowBtn) {
  removePaymentRowBtn.addEventListener('click', () => {
    if (paymentRowCount > 1) {
      paymentTypesTable.deleteRow(-1);
      paymentRowCount--;
      paymentTypesCell.rowSpan = paymentRowCount;
      renderPreview();
    }
  });
}

// === Дополнительные чекбоксы под Типами оплат ===
const complexPaymentsCheckbox = document.getElementById('complexPayments');
const cashInOutCheckbox = document.getElementById('cashInOut');

if (complexPaymentsCheckbox) {
  complexPaymentsCheckbox.addEventListener('change', renderPreview);
}
if (cashInOutCheckbox) {
  cashInOutCheckbox.addEventListener('change', renderPreview);
}

// === Новый вывод дополнительных параметров под Типами оплат ===
const carryOverOrdersCheckbox = document.getElementById('carryOverOrders');
const personalShiftsSelect = document.getElementById('personalShifts');
const egaisSelect = document.getElementById('egais');


const taxSystemSelect = document.getElementById('taxSystem');
const honestSignSelect = document.getElementById('honestSign');
const ndsSelect = document.getElementById('NDS');

if (taxSystemSelect) {
  taxSystemSelect.addEventListener('change', renderPreview);
}
if (honestSignSelect) {
  honestSignSelect.addEventListener('change', renderPreview);
}
if (ndsSelect) {
  ndsSelect.addEventListener('change', renderPreview);
}

// === Новый блок для Алкоголя ===
const bottleAlcoholCheckbox = document.getElementById('bottleAlcohol');
const draftAlcoholCheckbox = document.getElementById('draftAlcohol');
const strongAlcoholCheckbox = document.getElementById('strongAlcohol');

if (bottleAlcoholCheckbox) {
  bottleAlcoholCheckbox.addEventListener('change', renderPreview);
}
if (draftAlcoholCheckbox) {
  draftAlcoholCheckbox.addEventListener('change', renderPreview);
}

if (strongAlcoholCheckbox) {
  strongAlcoholCheckbox.addEventListener('change', renderPreview);
}

// === Новый блок для Печатать отчеты при закрытии КС и Нумерация заказов ===
const printReportsSelect = document.getElementById('printReports');
const orderNumberingSelect = document.getElementById('orderNumbering');


if (printReportsSelect) {
  printReportsSelect.addEventListener('change', renderPreview);
}
if (orderNumberingSelect) {
  orderNumberingSelect.addEventListener('change', renderPreview);
}

// === Новый блок для Сотрудники и Автоматический расчет ЗП ===
const employeesSelect = document.getElementById('employeesSelect');
const autoPayrollCheckbox = document.getElementById('autoPayroll');


if (employeesSelect) {
  employeesSelect.addEventListener('change', renderPreview);
}
if (autoPayrollCheckbox) {
  autoPayrollCheckbox.addEventListener('change', renderPreview);
}

// === Новый блок для Простые скидки ===
const simpleDiscountsTable = document.getElementById('simpleDiscountsTable');
const simpleDiscountsCell = document.getElementById('simpleDiscountsCell');
let simpleDiscountsRowCount = 1;

const addSimpleDiscountRowBtn = document.getElementById('addSimpleDiscountRow');
const removeSimpleDiscountRowBtn = document.getElementById('removeSimpleDiscountRow');

if (addSimpleDiscountRowBtn) {
  addSimpleDiscountRowBtn.addEventListener('click', () => {
    const row = simpleDiscountsTable.insertRow(-1);
    for (let i = 0; i < 2; i++) {
      const cell = row.insertCell(i);
      cell.contentEditable = "true";
    }
    simpleDiscountsRowCount++;
    simpleDiscountsCell.rowSpan = simpleDiscountsRowCount;
    renderPreview();
  });
}

if (removeSimpleDiscountRowBtn) {
  removeSimpleDiscountRowBtn.addEventListener('click', () => {
    if (simpleDiscountsRowCount > 1) {
      simpleDiscountsTable.deleteRow(-1);
      simpleDiscountsRowCount--;
      simpleDiscountsCell.rowSpan = simpleDiscountsRowCount;
      renderPreview();
    }
  });
}


// Чекбоксы для бонусной программы и сложных скидок
const bonusProgramCheckbox = document.getElementById('bonusProgram');
const complexDiscountsCheckbox = document.getElementById('complexDiscounts');

if (bonusProgramCheckbox) {
  bonusProgramCheckbox.addEventListener('change', renderPreview);
}
if (complexDiscountsCheckbox) {
  complexDiscountsCheckbox.addEventListener('change', renderPreview);
}


// === Новый блок для городов доставки ===
const deliveryCityInput = document.getElementById('deliveryCity');
const defaultDeliveryCityInput = document.getElementById('defaultCity');

if (deliveryCityInput) {
  deliveryCityInput.addEventListener('input', renderPreview);
}
if (defaultDeliveryCityInput) {
  defaultDeliveryCityInput.addEventListener('input', renderPreview);
}

// === Новый блок для Стикеры доставки и Момент печати стикера доставки ===
const deliveryStickersCheckbox = document.getElementById('deliveryStickersNew');
const deliveryStickerPrintMomentSelect = document.getElementById('deliveryStickerPrintMomentNew');

if (deliveryStickersCheckbox) {
  deliveryStickersCheckbox.addEventListener('change', renderPreview);
}
if (deliveryStickerPrintMomentSelect) {
  deliveryStickerPrintMomentSelect.addEventListener('change', renderPreview);
}

// === Новый блок для Накладная доставки и Момент печати накладной доставки ===
// Поддерживаем оба варианта ID: сначала проверяем новые поля с суффиксом New, затем старые
const deliveryInvoiceElements = [
  document.getElementById('deliveryInvoiceNew'),
  document.getElementById('deliveryInvoice')
].filter(Boolean);

const deliveryInvoicePrintMomentElements = [
  document.getElementById('deliveryInvoicePrintMomentNew'),
  document.getElementById('deliveryInvoicePrintMoment')
].filter(Boolean);

// Навешиваем обработчики на все найденные элементы (без дублей)
deliveryInvoiceElements.forEach(el => el.addEventListener('change', renderPreview));
deliveryInvoicePrintMomentElements.forEach(el => el.addEventListener('change', renderPreview));

// Утилиты для получения текущих значений (предпочитаем первый найденный элемент — обычно это NEW)
function getDeliveryInvoiceChecked() {
  return deliveryInvoiceElements.length > 0 ? !!deliveryInvoiceElements[0].checked : false;
}
function getDeliveryInvoiceMoment() {
  return deliveryInvoicePrintMomentElements.length > 0 ? (deliveryInvoicePrintMomentElements[0].value || '') : '';
}


if (carryOverOrdersCheckbox) {
  carryOverOrdersCheckbox.addEventListener('change', renderPreview);
}
if (personalShiftsSelect) {
  personalShiftsSelect.addEventListener('change', renderPreview);
}
if (egaisSelect) {
  egaisSelect.addEventListener('change', renderPreview);
}

// === Новый блок для Залы ===
const hallsTable = document.getElementById('hallsTable');
const hallsCell = document.getElementById('hallsCell');
let hallsRowCount = 1;

const addHallRowBtn = document.getElementById('addHallRow');
const removeHallRowBtn = document.getElementById('removeHallRow');

if (addHallRowBtn) {
  addHallRowBtn.addEventListener('click', () => {
    const row = hallsTable.insertRow(-1);
    for (let i = 0; i < 2; i++) {
      const cell = row.insertCell(i);
      cell.contentEditable = "true";
    }
    hallsRowCount++;
    hallsCell.rowSpan = hallsRowCount;
    renderPreview();
  });
}

if (removeHallRowBtn) {
  removeHallRowBtn.addEventListener('click', () => {
    if (hallsRowCount > 1) {
      hallsTable.deleteRow(-1);
      hallsRowCount--;
      hallsCell.rowSpan = hallsRowCount;
      renderPreview();
    }
  });
}

// === Новый блок для Должностей ===
const positionsTable = document.getElementById('positionsTable');
const positionsCell = document.getElementById('positionsCell');
let positionsRowCount = 1;

const addPositionRowBtn = document.getElementById('addPositionRow');
const removePositionRowBtn = document.getElementById('removePositionRow');

if (addPositionRowBtn) {
  addPositionRowBtn.addEventListener('click', () => {
    const row = positionsTable.insertRow(-1);
    for (let i = 0; i < 2; i++) { // Две редактируемые колонки (Название, Описание)
      const cell = row.insertCell(i);
      cell.contentEditable = "true";
    }
    positionsRowCount++;
    positionsCell.rowSpan = positionsRowCount;
    renderPreview();
  });
}

if (removePositionRowBtn) {
  removePositionRowBtn.addEventListener('click', () => {
    if (positionsRowCount > 1) {
      positionsTable.deleteRow(-1);
      positionsRowCount--;
      positionsCell.rowSpan = positionsRowCount;
      renderPreview();
    }
  });
}

// Слушаем ввод названия заведения и обновляем предпросмотр
if (placeNameInput) {
  placeNameInput.addEventListener('input', e => {
    placeName = e.target.value.trim();
    renderPreview();
  });
}

// Настройка выпадающего списка для выбора концепции управления
if (conceptSelect) {
  conceptSelect.addEventListener('change', e => {
    conceptValue = e.target.value;
    updateConceptNote();
    renderPreview();
  });
}

// Функция обновляет пояснение под выбранной концепцией
function updateConceptNote(){
  if (!conceptNote) return;
  if (conceptValue === 'RMS'){
    conceptNote.innerText = '*RMS(iikoOffice) - предназначен для управления одним рестораном, включая складской учет, финансы, персонал, учет продаж и т.д.';
  } else if (conceptValue === 'Chain'){
    conceptNote.innerText = '*Chain(iikoChain) - iikoChain предназначен для управления несколькими ресторанами, работающими в рамках одной сети. Он обеспечивает единую базу данных для всей сети, позволяя централизованно управлять номенклатурой, калькуляциями, ценовой политикой, дисконтными программами и другими параметрами.';
  } else {
    conceptNote.innerText = '';
  }
}

// === Новый блок для Формата обслуживания ===
if (serviceFormatSelect) {
  serviceFormatSelect.addEventListener('change', e => {
    serviceFormatValue = e.target.value;
    updateServiceFormatNote();
    renderPreview();
  });
}

if (installationSelect) {
  installationSelect.addEventListener('change', renderPreview);
}
if (exclusiveModeSelect) {
  exclusiveModeSelect.addEventListener('change', renderPreview);
}
if (iikoWebRightsSelect) {
  iikoWebRightsSelect.addEventListener('change', renderPreview);
}

function updateServiceFormatNote(){
  if (!serviceFormatNote) return;
  if (serviceFormatValue === 'TS'){
    serviceFormatNote.innerText = '*TS — полный сервис обслуживания за столом.';
  } else if (serviceFormatValue === 'FF'){
    serviceFormatNote.innerText = '*FF — формат быстрого питания.';
  } else {
    serviceFormatNote.innerText = '';
  }
}

// === Новый блок для Доставки ===
if (deliverySelect) {
  deliverySelect.addEventListener('change', e => {
    deliveryValue = e.target.value;
    updateDeliveryNote();
    // Управление видимостью блока стикеров доставки
    if (deliveryValue === 'Да') {
      document.getElementById('deliveryStickersBlock').style.display = 'flex';
    } else {
      document.getElementById('deliveryStickersBlock').style.display = 'none';
    }
    renderPreview();
  });
}

function updateDeliveryNote(){
  if (!deliveryNote) return;
  if (deliveryValue === 'Да'){
    deliveryNote.innerText = '*Доставка осуществляется.';
  } else if (deliveryValue === 'Нет'){
    deliveryNote.innerText = '*Доставка не предоставляется.';
  } else {
    deliveryNote.innerText = '';
  }
}

// === Новый блок для Авторизации сотрудников ===
if (authMethodsSelect) {
  authMethodsSelect.addEventListener('change', e => {
    authMethodsValues = Array.from(e.target.selectedOptions).map(opt => opt.value);
    updateAuthMethodsNote();
    renderPreview();
  });
}

function updateAuthMethodsNote(){
  if (!authMethodsNote) return;
  if (authMethodsValues.length > 0){
    authMethodsNote.innerText = '*Выбранные методы авторизации: ' + authMethodsValues.join(', ');
  } else {
    authMethodsNote.innerText = '';
  }
}

// Функция обновляет содержимое PDF-превью
function renderPreview(){

  // Устанавливаем значение списка оборудования в PDF
  const pdfEquipmentValue = document.getElementById('pdfEquipmentValue');
  if (pdfEquipmentValue) {
    pdfEquipmentValue.innerText = equipmentValue || '';
  }
  // Устанавливаем значение списка складов в PDF
  const pdfStorageValue = document.getElementById('pdfStorageValue');
  if (pdfStorageValue) {
    pdfStorageValue.innerText = storageValue || '';
  }

  // Вывод Дополнительные реализации в PDF
  const pdfAdvancedSettingsValue = document.getElementById('pdfAdvancedSettingsValue');
  if (pdfAdvancedSettingsValue) {
    pdfAdvancedSettingsValue.innerText = AdvancedSettingsValue || '';
  }

  // Копируем содержимое таблицы Места приготовления в PDF
  const pdfPrepTable = document.getElementById('pdfPrepPlacesTable');
  if (pdfPrepTable && prepTable) {
    // Удаляем все строки кроме заголовка
    while (pdfPrepTable.rows.length > 1) {
      pdfPrepTable.deleteRow(1);
    }
    // Клонируем строки из основной таблицы (кроме первой, так как она уже в PDF)
    for (let i = 1; i < prepTable.rows.length; i++) {
      const newRow = pdfPrepTable.insertRow(-1);
      for (let j = 0; j < prepTable.rows[i].cells.length; j++) {
        const newCell = newRow.insertCell(j);
        newCell.style.border = '2px solid var(--accent)';
        newCell.style.padding = '6px';
        newCell.style.fontSize = '12px';
        newCell.innerText = prepTable.rows[i].cells[j].innerText;
      }
    }
    // Обновляем rowspan для ячейки PDF
    const pdfPrepCell = document.getElementById('pdfPrepPlacesCell');
    if (pdfPrepCell) {
      pdfPrepCell.rowSpan = prepRowCount;
    }
  }

  // === Новый вывод Залов в PDF ===
  const pdfHallsTable = document.getElementById('pdfHallsTable');
  if (pdfHallsTable && hallsTable) {
    // Удаляем все строки кроме заголовка
    while (pdfHallsTable.rows.length > 1) {
      pdfHallsTable.deleteRow(1);
    }
    // Копируем строки
    for (let i = 1; i < hallsTable.rows.length; i++) {
      const newRow = pdfHallsTable.insertRow(-1);
      for (let j = 0; j < hallsTable.rows[i].cells.length; j++) {
        const newCell = newRow.insertCell(j);
        newCell.style.border = '2px solid var(--accent)';
        newCell.style.padding = '6px';
        newCell.style.fontSize = '12px';
        newCell.innerText = hallsTable.rows[i].cells[j].innerText;
      }
    }
    const pdfHallsCell = document.getElementById('pdfHallsCell');
    if (pdfHallsCell) {
      pdfHallsCell.rowSpan = hallsRowCount;
    }
  }

  // === Новый вывод Должностей в PDF ===
  const pdfPositionsTable = document.getElementById('pdfPositionsTable');
  // (Временно убираем этот блок, вставим его ниже)


  // === Новый вывод Типы оплат в PDF ===
  const pdfPaymentTypesTable = document.getElementById('pdfPaymentTypesTable');
  if (pdfPaymentTypesTable && paymentTypesTable) {
    // Удаляем все строки кроме заголовка
    while (pdfPaymentTypesTable.rows.length > 1) {
      pdfPaymentTypesTable.deleteRow(1);
    }
    // Копируем строки
    for (let i = 1; i < paymentTypesTable.rows.length; i++) {
      const newRow = pdfPaymentTypesTable.insertRow(-1);
      for (let j = 0; j < paymentTypesTable.rows[i].cells.length; j++) {
        const newCell = newRow.insertCell(j);
        newCell.style.border = '2px solid var(--accent)';
        newCell.style.padding = '6px';
        newCell.style.fontSize = '12px';

        const originalCell = paymentTypesTable.rows[i].cells[j];
        const input = originalCell.querySelector('input[type="checkbox"]');
        if (input) {
          newCell.innerText = input.checked ? 'Да' : 'Нет';
        } else {
          newCell.innerText = originalCell.innerText;
        }
      }
    }
    const pdfPaymentTypesCell = document.getElementById('pdfPaymentTypesCell');
    if (pdfPaymentTypesCell) {
      pdfPaymentTypesCell.rowSpan = paymentRowCount;
    }
  }

  // (Копирование таблицы Дополнительные реализации удалено)

  // === Новый вывод дополнительных чекбоксов под Типами оплат в PDF ===
  const pdfComplexPayments = document.getElementById('pdfComplexPayments');
  const pdfCashInOut = document.getElementById('pdfCashInOut');

  if (pdfComplexPayments) {
    pdfComplexPayments.innerText = complexPaymentsCheckbox && complexPaymentsCheckbox.checked
      ? 'Необходимо настроить сложные типы оплат: Да'
      : 'Необходимо настроить сложные типы оплат: Нет';
  }
  if (pdfCashInOut) {
    pdfCashInOut.innerText = cashInOutCheckbox && cashInOutCheckbox.checked
      ? 'Необходимо настроить внесения/изъятия: Да'
      : 'Необходимо настроить внесения/изъятия: Нет';
  }

  // === Новый вывод Дополнительные настройки в PDF (карточки) ===
  const pdfAdditionalSettingsCards = document.getElementById('pdfAdditionalSettingsCards');
  if (pdfAdditionalSettingsCards) {
    pdfAdditionalSettingsCards.innerHTML = '';
    const items = [
      ['Необходимо настроить сложные типы оплат', (complexPaymentsCheckbox && complexPaymentsCheckbox.checked) ? 'Да' : 'Нет'],
      ['Необходимо настроить внесения/изъятия', (cashInOutCheckbox && cashInOutCheckbox.checked) ? 'Да' : 'Нет']
    ];
    items.forEach(([k, v]) => {
      const card = document.createElement('div');
      card.className = 'pdf-card';
      const keyEl = document.createElement('div');
      keyEl.className = 'k';
      keyEl.textContent = k;
      const valEl = document.createElement('div');
      valEl.className = 'v';
      valEl.textContent = v;
      card.appendChild(keyEl);
      card.appendChild(valEl);
      pdfAdditionalSettingsCards.appendChild(card);
    });
  }

  // === Новый вывод Сотрудники (после таблицы Должности) в PDF (карточки) ===
  const pdfEmployeesCards = document.getElementById('pdfEmployeesCards');
  if (pdfEmployeesCards) {
    pdfEmployeesCards.innerHTML = '';
    const items = [
      ['Сотрудники', (employeesSelect && employeesSelect.value) ? employeesSelect.value : '—'],
      ['Необходимо настроить автоматический расчет заработных плат', (autoPayrollCheckbox && autoPayrollCheckbox.checked) ? 'Да' : 'Нет']
    ];
    items.forEach(([k, v]) => {
      const card = document.createElement('div');
      card.className = 'pdf-card';
      const keyEl = document.createElement('div');
      keyEl.className = 'k';
      keyEl.textContent = k;
      const valEl = document.createElement('div');
      valEl.className = 'v';
      valEl.textContent = v;
      card.appendChild(keyEl);
      card.appendChild(valEl);
      pdfEmployeesCards.appendChild(card);
    });
  }

  // === Вывод дополнительных карточек в разделе Скидки и бонусы ===
  const pdfDiscountsExtraCards = document.getElementById('pdfDiscountsExtraCards');
  if (pdfDiscountsExtraCards) {
    pdfDiscountsExtraCards.innerHTML = '';
    const items = [
      ['Необходимо настроить бонусную программу', (bonusProgramCheckbox && bonusProgramCheckbox.checked) ? 'Да' : 'Нет'],
      ['Необходимо настроить сложные скидки (1+1, счастливые часы и тд)', (complexDiscountsCheckbox && complexDiscountsCheckbox.checked) ? 'Да' : 'Нет']
    ];
    items.forEach(([k, v]) => {
      const card = document.createElement('div');
      card.className = 'pdf-card';
      const keyEl = document.createElement('div');
      keyEl.className = 'k';
      keyEl.textContent = k;
      const valEl = document.createElement('div');
      valEl.className = 'v';
      valEl.textContent = v;
      card.appendChild(keyEl);
      card.appendChild(valEl);
      pdfDiscountsExtraCards.appendChild(card);
    });
  }

  // === Новый вывод Кассовые смены в PDF (табличный формат) ===
  const pdfCashShiftsCards = document.getElementById('pdfCashShiftsCards');
  if (pdfCashShiftsCards) {
    pdfCashShiftsCards.innerHTML = '';
    const items = [
      ['Перенос заказов на следующий день', carryOverOrdersCheckbox && carryOverOrdersCheckbox.checked ? 'Да' : 'Нет'],
      ['Личные смены', (personalShiftsSelect && personalShiftsSelect.value) ? personalShiftsSelect.value : '—'],
      ['Нумерация заказов', (orderNumberingSelect && orderNumberingSelect.value) ? orderNumberingSelect.value : '—']
    ];
    items.forEach(([k, v]) => {
      const card = document.createElement('div');
      card.className = 'pdf-card';
      const keyEl = document.createElement('div');
      keyEl.className = 'k';
      keyEl.textContent = k;
      const valEl = document.createElement('div');
      valEl.className = 'v';
      valEl.textContent = v;
      card.appendChild(keyEl);
      card.appendChild(valEl);
      pdfCashShiftsCards.appendChild(card);
    });
  }
  

  // === Новый вывод Система налогообложения, маркировка, ЕГАИС в PDF (карточки) ===
  const pdfTaxOptionsCards = document.getElementById('pdfTaxOptionsCards');
  if (pdfTaxOptionsCards) {
    pdfTaxOptionsCards.innerHTML = '';
    const items = [
      ['Система налогообложения', (taxSystemSelect && taxSystemSelect.value) ? taxSystemSelect.value : '—'],
      ['НДС', (ndsSelect && ndsSelect.value) ? ndsSelect.value : '—'],
      ['ЧЕСТНЫЙ ЗНАК', (honestSignSelect && honestSignSelect.value) ? honestSignSelect.value : '—']
    ];
    items.forEach(([k, v]) => {
      const card = document.createElement('div');
      card.className = 'pdf-card';
      const keyEl = document.createElement('div');
      keyEl.className = 'k';
      keyEl.textContent = k;
      const valEl = document.createElement('div');
      valEl.className = 'v';
      valEl.textContent = v;
      card.appendChild(keyEl);
      card.appendChild(valEl);
      pdfTaxOptionsCards.appendChild(card);
    });
  }

  // === Новый вывод Алкоголь в PDF (карточки) ===
  const pdfAlcoholCards = document.getElementById('pdfAlcoholCards');
  if (pdfAlcoholCards) {
    pdfAlcoholCards.innerHTML = '';
    const items = [
      ['ЕГАИС', (egaisSelect && egaisSelect.value) ? egaisSelect.value : '—'],
      ['Бутылочный алкоголь', (bottleAlcoholCheckbox && bottleAlcoholCheckbox.checked) ? 'Да' : 'Нет'],
      ['Разливной алкоголь', (draftAlcoholCheckbox && draftAlcoholCheckbox.checked) ? 'Да' : 'Нет'],
      ['Крепкий алкоголь', (strongAlcoholCheckbox && strongAlcoholCheckbox.checked) ? 'Да' : 'Нет']
    ];
    items.forEach(([k, v]) => {
      const card = document.createElement('div');
      card.className = 'pdf-card';
      const keyEl = document.createElement('div');
      keyEl.className = 'k';
      keyEl.textContent = k;
      const valEl = document.createElement('div');
      valEl.className = 'v';
      valEl.textContent = v;
      card.appendChild(keyEl);
      card.appendChild(valEl);
      pdfAlcoholCards.appendChild(card);
    });
  }

  // === Вывод Печатать отчеты при закрытии КС и Нумерация заказов в PDF ===
  // === Новый вывод Печатать отчеты при закрытии КС в PDF (бейджи) ===
  const pdfPrintReportsBadges = document.getElementById('pdfPrintReportsBadges');
  if (pdfPrintReportsBadges) {
    pdfPrintReportsBadges.innerHTML = '';
    const selectedReports = printReportsSelect ? Array.from(printReportsSelect.selectedOptions).map(opt => opt.value) : [];
    if (selectedReports.length === 0) {
      const none = document.createElement('span');
      none.textContent = '—';
      pdfPrintReportsBadges.appendChild(none);
    } else {
      selectedReports.forEach(rep => {
        // Пытаемся выделить код отчета (цифры в начале) для бейджа
        const codeMatch = rep.match(/^([0-9X]+)\b/);
        const badgeText = codeMatch ? codeMatch[1] : rep;
        const badge = document.createElement('span');
        badge.className = 'pdf-badge';
        badge.textContent = badgeText;
        badge.title = rep;
        pdfPrintReportsBadges.appendChild(badge);
      });
    }
  }

  // === Новый вывод Сотрудники и Автоматический расчет ЗП в PDF ===
  const pdfEmployees = document.getElementById('pdfEmployees');
  const pdfAutoPayroll = document.getElementById('pdfAutoPayroll');

  if (pdfEmployees) {
    pdfEmployees.innerText = 'Сотрудники: ' + (employeesSelect && employeesSelect.value ? employeesSelect.value : '—');
  }
  if (pdfAutoPayroll) {
    pdfAutoPayroll.innerText = 'Необходимо настроить автоматический расчет заработных плат: ' + (autoPayrollCheckbox && autoPayrollCheckbox.checked ? 'Да' : 'Нет');
  }

  // === Новый вывод Простые скидки в PDF ===
  const pdfSimpleDiscountsTable = document.getElementById('pdfSimpleDiscountsTable');
  if (pdfSimpleDiscountsTable && simpleDiscountsTable) {
    while (pdfSimpleDiscountsTable.rows.length > 1) {
      pdfSimpleDiscountsTable.deleteRow(1);
    }
    for (let i = 1; i < simpleDiscountsTable.rows.length; i++) {
      const newRow = pdfSimpleDiscountsTable.insertRow(-1);
      for (let j = 0; j < simpleDiscountsTable.rows[i].cells.length; j++) {
        const newCell = newRow.insertCell(j);
        newCell.style.border = '2px solid var(--accent)';
        newCell.style.padding = '6px';
        newCell.style.fontSize = '12px';
        newCell.innerText = simpleDiscountsTable.rows[i].cells[j].innerText;
      }
    }
    const pdfSimpleDiscountsCell = document.getElementById('pdfSimpleDiscountsCell');
    if (pdfSimpleDiscountsCell) {
      pdfSimpleDiscountsCell.rowSpan = simpleDiscountsRowCount;
    }
  }



  // === Новый вывод Доставка в PDF (карточки) ===
  const pdfDeliveryCards = document.getElementById('pdfDeliveryCards');
  if (pdfDeliveryCards) {
    pdfDeliveryCards.innerHTML = '';
    const cityVal = deliveryCityInput && deliveryCityInput.value.trim();
    const defCityVal = defaultDeliveryCityInput && defaultDeliveryCityInput.value.trim();
    const invoiceChecked = getDeliveryInvoiceChecked();
    const invoiceMomentVal = getDeliveryInvoiceMoment();
    const items = [
      ['Город доставки', cityVal ? cityVal : '—'],
      ['Город по-умолчанию', defCityVal ? defCityVal : '—'],
      ['Стикеры доставки', (deliveryStickersCheckbox && deliveryStickersCheckbox.checked) ? 'Да' : 'Нет'],
      ['Момент печати стикера доставки', (deliveryStickerPrintMomentSelect && deliveryStickerPrintMomentSelect.value) ? deliveryStickerPrintMomentSelect.value : '—'],
      ['Накладная доставки', invoiceChecked ? 'Да' : 'Нет'],
      ['Момент печати накладной доставки', invoiceMomentVal ? invoiceMomentVal : '—'],
      ['Количество накладных', (invoiceCountInput && invoiceCountInput.value) ? invoiceCountInput.value : '—'],
      ['Оплата доставки при отправке', (deliveryPaymentOnSendCheckbox && deliveryPaymentOnSendCheckbox.checked) ? 'Да' : 'Нет'],
      ['Автоматическое приготовление доставки', (autoDeliveryCookingCheckbox && autoDeliveryCookingCheckbox.checked) ? 'Да' : 'Нет'],
      ['Подтверждение доставок', (deliveryConfirmationCheckbox && deliveryConfirmationCheckbox.checked) ? 'Да' : 'Нет'],
      ['Картография', (cartographyCheckbox && cartographyCheckbox.checked) ? 'Да' : 'Нет']
    ];
    items.forEach(([k, v]) => {
      const card = document.createElement('div');
      card.className = 'pdf-card';
      const keyEl = document.createElement('div');
      keyEl.className = 'k';
      keyEl.textContent = k;
      const valEl = document.createElement('div');
      valEl.className = 'v';
      valEl.textContent = v;
      card.appendChild(keyEl);
      card.appendChild(valEl);
      pdfDeliveryCards.appendChild(card);
    });
}

  // === Новый вывод Должностей в PDF ===
  if (pdfPositionsTable && positionsTable && positionsTable.rows.length > 1) {
    // Удаляем все строки кроме заголовка
    while (pdfPositionsTable.rows.length > 1) {
      pdfPositionsTable.deleteRow(1);
    }
    // Копируем строки (кроме первой строки с заголовком в основной таблице)
    for (let i = 1; i < positionsTable.rows.length; i++) {
      const newRow = pdfPositionsTable.insertRow(-1);
      for (let j = 0; j < positionsTable.rows[i].cells.length; j++) {
        const newCell = newRow.insertCell(j);
        newCell.style.border = '2px solid var(--accent)';
        newCell.style.padding = '6px';
        newCell.style.fontSize = '12px';
        newCell.textContent = positionsTable.rows[i].cells[j].innerText || '';
      }
    }
    // Обновляем rowspan для первой ячейки PDF
    const pdfPositionsCell = document.getElementById('pdfPositionsCell');
    if (pdfPositionsCell) {
      pdfPositionsCell.rowSpan = positionsRowCount;
    }
  }

  // Показ примечания под таблицей Должностей
  const pdfPositionsNote = document.getElementById('pdfPositionsNote');
  if (pdfPositionsNote) {
    if (positionsTable && positionsTable.rows.length > 1) {
      pdfPositionsNote.style.display = 'block';
    } else {
      pdfPositionsNote.style.display = 'none';
    }
  }

  // Устанавливаем название заведения в PDF
  const pdfPlaceName = document.getElementById('pdfPlaceName');
  if (pdfPlaceName) {
    pdfPlaceName.innerText = 'Название заведения: ' + (placeName || '');
  }

  const pdfConcept = document.getElementById('pdfConcept');
  const pdfConceptNote = document.getElementById('pdfConceptNote');
  if (pdfConcept) {
    pdfConcept.innerText = conceptValue ? 'Концепция управления: ' + conceptValue : '';
  }
  if (pdfConceptNote) {
    if (conceptValue === 'RMS'){
      pdfConceptNote.innerText = '*RMS(iikoOffice) - предназначен для управления одним рестораном, включая складской учет, финансы, персонал, учет продаж и т.д.';
    } else if (conceptValue === 'Chain'){
      pdfConceptNote.innerText = '*Chain(iikoChain) - iikoChain предназначен для управления несколькими ресторанами, работающими в рамках одной сети. Он обеспечивает единую базу данных для всей сети, позволяя централизованно управлять номенклатурой, калькуляциями, ценовой политикой, дисконтными программами и другими параметрами.';
    } else {
      pdfConceptNote.innerText = '';
    }
  }

  // === Новый вывод Формата обслуживания в PDF ===
  const pdfServiceFormat = document.getElementById('pdfServiceFormat');
  const pdfServiceFormatNote = document.getElementById('pdfServiceFormatNote');
  const pdfInstallation = document.getElementById('pdfInstallation');
  const pdfExclusiveMode = document.getElementById('pdfExclusiveMode');
  const pdfIikoWebRights = document.getElementById('pdfIikoWebRights');
  if (pdfServiceFormat) {
    pdfServiceFormat.innerText = serviceFormatValue ? 'Формат обслуживания: ' + serviceFormatValue : '';
  }
  if (pdfServiceFormatNote) {
    if (serviceFormatValue === 'TS'){
      pdfServiceFormatNote.innerText = '*TS - включает весь функционал FF и дополнительно предоставляет возможности для работы с официантами. Она позволяет вести счета, перемещать заказы между столами, управлять обслуживанием в зале и т.д. ';
    } else if (serviceFormatValue === 'FF'){
      pdfServiceFormatNote.innerText = '*FF - предназначена для предприятий, где обслуживание происходит в формате самообслуживания или при минимальном участии официантов. Она не включает в себя функционал, ориентированный на работу с официантами, такой как ведение счетов, перемещение между столами, обслуживание в зале.';
    } else {
      pdfServiceFormatNote.innerText = '';
    }
  }

  if (pdfInstallation) {
    const v = installationSelect && installationSelect.value ? installationSelect.value : '';
    pdfInstallation.innerText = v ? ('Установка iikoOffice/iikoChain: ' + v) : '';
  }
  if (pdfExclusiveMode) {
    const v = exclusiveModeSelect && exclusiveModeSelect.value ? exclusiveModeSelect.value : '';
    pdfExclusiveMode.innerText = v ? ('Эксклюзивный режим: ' + v) : '';
  }
  if (pdfIikoWebRights) {
    const v = iikoWebRightsSelect && iikoWebRightsSelect.value ? iikoWebRightsSelect.value : '';
    pdfIikoWebRights.innerText = v ? ('Даём права в iikoWeb: ' + v) : '';
  }

  // === Новый вывод Доставки в PDF ===
  const pdfDelivery = document.getElementById('pdfDelivery');
  const pdfDeliveryNote = document.getElementById('pdfDeliveryNote');
  if (pdfDelivery) {
    pdfDelivery.innerText = deliveryValue ? 'Доставка: ' + deliveryValue : '';
  }
  if (pdfDeliveryNote) {
    if (deliveryValue === 'Да'){
      pdfDeliveryNote.innerText = '*Доставка осуществляется.';
    } else if (deliveryValue === 'Нет'){
      pdfDeliveryNote.innerText = '*Доставка не предоставляется.';
    } else {
      pdfDeliveryNote.innerText = '';
    }
  }

  // === Новый вывод Авторизации сотрудников в PDF ===
  const pdfAuthMethods = document.getElementById('pdfAuthMethods');
  if (pdfAuthMethods) {
    pdfAuthMethods.innerText = authMethodsValues.length > 0 ? 'Авторизация сотрудников: ' + authMethodsValues.join(', ') : '';
  }

  if (pdfDate) {
    pdfDate.innerText = new Date().toLocaleDateString('ru-RU');
  }

  // === Новый вывод Опций кухни в PDF ===
  const pdfChefTerminals = document.getElementById('pdfChefTerminals');
  const pdfSecondScreens = document.getElementById('pdfSecondScreens');
  const pdfElectronicQueues = document.getElementById('pdfElectronicQueues');
  const pdfIntegratedScales = document.getElementById('pdfIntegratedScales');

  if (pdfChefTerminals) {
    pdfChefTerminals.innerText = chefTerminalsCheckbox && chefTerminalsCheckbox.checked ? 'Да' : 'Нет';
  }
  if (pdfSecondScreens) {
    pdfSecondScreens.innerText = secondScreensCheckbox && secondScreensCheckbox.checked ? 'Да' : 'Нет';
  }
  if (pdfElectronicQueues) {
    pdfElectronicQueues.innerText = electronicQueuesCheckbox && electronicQueuesCheckbox.checked ? 'Да' : 'Нет';
  }
  if (pdfIntegratedScales) {
    pdfIntegratedScales.innerText = integratedScalesCheckbox && integratedScalesCheckbox.checked ? 'Да' : 'Нет';
  }

  // === Новый вывод Количество накладных и дополнительных параметров в PDF ===
  // === Вывод новых параметров после Момент печати накладной доставки ===
  const pdfInvoiceCount = document.getElementById('pdfInvoiceCount');
  if (pdfInvoiceCount) {
    pdfInvoiceCount.innerText = 'Количество накладных: ' + (invoiceCountInput && invoiceCountInput.value ? invoiceCountInput.value : '—');
  }

  const pdfDeliveryPaymentOnSend = document.getElementById('pdfDeliveryPaymentOnSend');
  if (pdfDeliveryPaymentOnSend) {
    pdfDeliveryPaymentOnSend.innerText = 'Оплата доставки при отправке: ' + (deliveryPaymentOnSendCheckbox && deliveryPaymentOnSendCheckbox.checked ? 'Да' : 'Нет');
  }

  const pdfAutoDeliveryCooking = document.getElementById('pdfAutoDeliveryCooking');
  if (pdfAutoDeliveryCooking) {
    pdfAutoDeliveryCooking.innerText = 'Автоматическое приготовление доставки: ' + (autoDeliveryCookingCheckbox && autoDeliveryCookingCheckbox.checked ? 'Да' : 'Нет');
  }

  const pdfDeliveryConfirmation = document.getElementById('pdfDeliveryConfirmation');
  if (pdfDeliveryConfirmation) {
    pdfDeliveryConfirmation.innerText = 'Подтверждение доставок: ' + (deliveryConfirmationCheckbox && deliveryConfirmationCheckbox.checked ? 'Да' : 'Нет');
  }

  const pdfCartography = document.getElementById('pdfCartography');
  if (pdfCartography) {
    pdfCartography.innerText = 'Картография: ' + (cartographyCheckbox && cartographyCheckbox.checked ? 'Да' : 'Нет');
  }
}

// === Новый блок для доп. реализаций ===
const AdvanceSettingsInput = document.getElementById('AdvancedSettings');
let AdvancedSettingsValue = '';

if (AdvanceSettingsInput) {
  AdvanceSettingsInput.addEventListener('input', e => {
    AdvancedSettingsValue = e.target.value.trim();
    renderPreview();
  });
}

// Кнопка генерации PDF: формируем и сохраняем файл
const genPDFButton = document.getElementById('genPDF');
if (genPDFButton) {
  genPDFButton.addEventListener('click', () => {
    renderPreview();
    const element = document.getElementById('pdfSheet');
    if (!element) return;

    html2canvas(element, { scale: 2, useCORS: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      // Resolve jsPDF constructor for different builds (v2 exposes window.jspdf.jsPDF)
      const JsPDFCtor = (window.jspdf && window.jspdf.jsPDF)
        ? window.jspdf.jsPDF
        : (typeof jsPDF !== 'undefined' ? jsPDF : null);
      if (!JsPDFCtor) {
        console.error('jsPDF is not available');
        alert('Ошибка: библиотека jsPDF не загружена. Попробуйте обновить страницу.');
        return;
      }
      const pdf = new JsPDFCtor('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      // Pixel-to-mm mapping
      const pxPerMm = canvas.height / imgHeight;
      const pageHeightPx = Math.floor(pageHeight * pxPerMm);

      // Collect potential safe breakpoints (bottoms of cards and table rows)
      const scaleFactor = canvas.height / element.scrollHeight;
      function getOffsetTopWithin(root, el) {
        let top = 0;
        let node = el;
        while (node && node !== root) {
          top += node.offsetTop;
          node = node.offsetParent;
        }
        return top;
      }
      const selectable = element.querySelectorAll('table, table tr, .pdf-card, .pdf-cards, .section-title');
      const breakBottomsPx = Array.from(selectable).map(el => {
        const top = getOffsetTopWithin(element, el);
        const bottom = top + el.offsetHeight;
        return Math.round(bottom * scaleFactor);
      }).sort((a,b) => a - b);

      // Также добавляем точки разрыва по верху секций и явных .page-break
      const selectableTops = element.querySelectorAll('.page-break, .section-title, .force-break');
      const breakTopsPx = Array.from(selectableTops).map(el => {
        const top = getOffsetTopWithin(element, el);
        return Math.round(top * scaleFactor);
      }).sort((a,b) => a - b);
      const breakPointsPx = [...new Set([...breakBottomsPx, ...breakTopsPx])].sort((a,b) => a - b);

      let renderedHeight = 0;
      let pageNum = 0;
      while (renderedHeight < canvas.height) {
        let fragmentHeight = Math.min(pageHeightPx, canvas.height - renderedHeight);
        // Snap to nearest safe breakpoint to avoid cutting elements
        const pageBottomTarget = renderedHeight + fragmentHeight;
        const margin = 24; // px safety margin
        const minContent = 60; // avoid empty pages
        const candidates = breakPointsPx.filter(b => b <= pageBottomTarget - margin && b > renderedHeight + minContent);
        if (candidates.length > 0) {
          const snap = candidates[candidates.length - 1];
          fragmentHeight = Math.max(minContent, snap - renderedHeight);
        }
        // Если ближайшая force-break попадает внутрь текущего окна - ломаем по ней
        const forceTops = Array.from(element.querySelectorAll('.force-break')).map(el => Math.round(getOffsetTopWithin(element, el) * scaleFactor));
        const nextForce = forceTops.find(t => t > renderedHeight + minContent && t < renderedHeight + fragmentHeight);
        if (nextForce) {
          fragmentHeight = nextForce - renderedHeight;
        }

        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        pageCanvas.height = fragmentHeight;
        const ctx = pageCanvas.getContext('2d');
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(canvas, 0, renderedHeight, canvas.width, fragmentHeight, 0, 0, canvas.width, fragmentHeight);
        const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.98);
        if (pageNum > 0) pdf.addPage();
        pdf.addImage(pageImgData, 'JPEG', 0, 0, imgWidth, fragmentHeight / pxPerMm);
        renderedHeight += fragmentHeight;
        pageNum++;
      }
      // Формируем имя файла: "Чек-лист РМС встречи - <Название заведения>.pdf"
      const rawName = (placeName && placeName.trim()) || (placeNameInput && placeNameInput.value && placeNameInput.value.trim()) || '';
      const safeName = (rawName || 'Без названия')
        .replace(/[\\/:*?"<>|]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 100);
      const fileName = `Чек-лист РМС встречи - ${safeName}.pdf`;
      pdf.save(fileName);
    });
  });
}

// Логотип как константа (замените URL/данные на ваш постоянный логотип)
const CONSTANT_LOGO_URL = 'logo.png'; // положите файл рядом с index (main.html)
const CONSTANT_LOGO_DATAURL = null; // если хотите, можно вставить dataURL вместо файла
function applyLogo(dataUrlOrUrl){
  const siteLogo = document.querySelector('.logo-square');
  const pdfLogo = document.querySelector('#pdfSheet .sq');
  const abstractEl = document.querySelector('#pdfSheet .abstract');
  const bg = dataUrlOrUrl ? `url(${dataUrlOrUrl})` : '';
  if (siteLogo){
    siteLogo.style.backgroundImage = bg;
    if (dataUrlOrUrl) siteLogo.classList.add('logo-has-img');
  }
  if (pdfLogo){
    // Не показываем логотип в PDF в квадрате sq — оставляем стандартный вид без фона
    pdfLogo.style.backgroundImage = '';
    pdfLogo.classList.remove('logo-has-img');
  }
  if (abstractEl){
    if (dataUrlOrUrl){
      abstractEl.style.backgroundImage = bg;
      abstractEl.classList.add('abstract-has-img');
      abstractEl.textContent = '';
    } else {
      abstractEl.style.backgroundImage = '';
      abstractEl.classList.remove('abstract-has-img');
      abstractEl.textContent = 'РЕСТ';
    }
  }
}
// Применяем константный логотип на загрузке (URL приоритетнее, затем dataURL)
applyLogo(CONSTANT_LOGO_URL || CONSTANT_LOGO_DATAURL);
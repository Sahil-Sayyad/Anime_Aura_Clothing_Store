var sizeSeleted = "";

function onSizeChange(size) {
  console.log(size);
  console.log(sizeSeleted);
  let prevSizeDom = document.getElementById(sizeSeleted);
  let newSizeDom = document.getElementById(size);

  if (prevSizeDom)
    prevSizeDom.classList.remove('bg-lime-200', 'text-gray-800', 'text-xl');

  newSizeDom.classList.add('bg-lime-200', 'text-gray-800', 'text-xl');
  sizeSeleted = size;
}


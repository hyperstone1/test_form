let oldres: string;

export function uppercase(str: string) {
  let inputData: string[] = str.split(' ');
  let validatedData: string[] = [];
  let reg = new RegExp('^(?!.* .* )(?!^ )[A-Za-zА-Яа-яЁё ]*(?!.* $)');
  const regres = str.match(reg);
  if (regres != null) {
    oldres = regres[0];
    for (var x = 0; x < inputData.length; x++) {
      validatedData.push(inputData[x].charAt(0).toUpperCase() + inputData[x].slice(1));
    }
    console.log(validatedData);
  } else {
    validatedData.push(oldres);
    console.log(validatedData);
  }
  console.log(validatedData.join(' '));
  return validatedData.join(' ');
}

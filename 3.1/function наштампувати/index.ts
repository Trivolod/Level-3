// not with all fields
function processPartialData<T>(
  data: Partial<T>,
  completer: (partialData: Partial<T>) => T
): T {
  return completer(data);
}

// without id
type OptionalId<T extends { id: string }> = Omit<T, 'id'> & { id?: string };

function processWithOptionalId<T extends { id: string }>(
  data: OptionalId<T>,
  completer: (data: OptionalId<T>) => T
): T {
  return completer(data);
}

// universal class stamping
class Rectangle {
  w!: number;
  h!: number;
}

class Circle {
  radius!: number;
}

function наштампувати<T>(SOMECLASS: new () => T, count: number): T[] {
  let a: T[] = [];
  for (let i = 0; i < count; i++) {
    a.push(new SOMECLASS());
  }
  return a;
}

let a: Rectangle[] = наштампувати(Rectangle, 10);
let b: Rectangle[] = наштампувати(Rectangle, 10);
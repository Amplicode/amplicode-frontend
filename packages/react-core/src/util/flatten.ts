export function flatten(obj: any, path = ''): Record<string, any> {
  if (Array.isArray(obj)) {
    return obj.reduce((acc, cur, index) => {
        return {
            ...acc,
            ...flatten(cur, `${path}[${index}]`)
        }
    }, {})
  }

  if (typeof obj === 'object' && obj !== null) {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        return {
            ...acc,
            ...flatten(value, path !== '' ? `${path}.${key}` : key)
        }
    }, {})
  }

  return {[path]: obj}
}

function mutateObjectByPath(obj: Record<string, any> | any[], path: string, value: any) {
    if (path[0] === '.') {
        mutateObjectByPath(obj, path.slice(1), value);
        return;
    }

    const head = path.match(/(^\[\w+\])|(^\w+)/)?.[0];

    if (head != null) {
        const headIsArray = head[0] === '['
        const tail = path.replace(head, '');
        
        if (headIsArray) {
            if (!Array.isArray(obj)) throw new Error('You can\'t set not array value to array');

            const index = +head.replace(/\[|\]/g, '');
            
            if (tail.length > 0) {
                const nextHeadIsArray = tail[0] === '[';
                if(obj[index] == null) {
                    obj[index] = nextHeadIsArray ? [] : {};
                }
                mutateObjectByPath(obj[index], tail, value)
            } else {
                obj[index] = value
            }
        } else {
            if (typeof obj === 'object' && Array.isArray(obj)) throw new Error('You can\'t set array value to object');
            const key = head;
            
            if (tail.length > 0) {     
                if(obj[key] == null) {
                    const nextHeadIsArray = tail[0] === '[';
                    obj[key] = nextHeadIsArray ? [] : {};
                }
                mutateObjectByPath(obj[key], tail, value)
            } else {
                obj[key] = value
            }
        }
    }
}

export function unflatten(flattenObject: Record<string, any>) {
    // for getting primitives
    if (
        Object.keys(flattenObject).length === 1
        && Object.prototype.hasOwnProperty.call(flattenObject, '')
    ) {
        return flattenObject[''];
    }

    const result = Object.keys(flattenObject).every(path => path[0] === '[') ? [] : {}
    
    Object.entries(flattenObject).forEach(([path, value]) => {
        mutateObjectByPath(result, path, value);
    });

    return result;
}

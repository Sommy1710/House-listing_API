export const asyncHandler = (fn) => async function (req, res, next)
{
    try {
        return await fn(req, res);
    } catch (error) {
        next(error);
    }
};

export const getSecondsFromNow = (seconds) => {
    const currentTime = new Date();
    currentTime.setSeconds(currentTime.getSeconds() + seconds);
    return currentTime.getTime() / 1000;

};




//in the code below, we create a permissions object

export const permissions = {
   listings: {
        create: ["admin", "super admin"],
        read: ["user", "admin", "super admin"],
        update: ["admin", "super admin"],
        delete: ["admin", "super admin"],
    },

    user: {
        create: ["admin", "super admin"],
        read: ["admin", "super admin"],
        update: ["admin", "super admin"],
        delete: ["admin", "super admin"],
    },

    role: {
        create: ["super admin"],
        read: ["super admin"],
        update: ["super admin"],
        delete: ["supeer admin"],
    },
    auth: {
    read: ["admin", "super admin"], 
    create: [],
    update: [],
    delete: [],
  }
};

export function getOperationType(method)
{
    let operation;
     switch (method)
        {
            case "post":
                operation = "create";
                break;
            case "get":
                operation = "read";
                break;
            case "put":
                operation = "update";
                break;
            case "delete":
                operation = "delete";
                break;
            default:
                operation = "read";
        }
        return operation;
}


export async function aggregateResults(model, payload) {
  const { skip = 0, limit = 20, sort = { createdAt: -1 }, ...filters } = payload;

  const [results, total] = await Promise.all([
    model.find(filters).skip(skip).limit(limit).sort(sort),
    model.countDocuments(filters)
  ]);

  return {
    listings: results,
    total
  };
}
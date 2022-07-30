import type { NextApiRequest, NextApiResponse } from "next";
import Passes from "../../../../components/pass/ColorPass";
import Random from "../../../../components/Random";
import { ApiColorValue } from "../../../../components/types/ColorFormat";

type ResponseDetails = ApiColorValue[] | string;

/**
 * @internal
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseDetails>
) {
  // Get the type and amount ofcolors needed
  const { type, amount } = req.query!;

  // If amount or type is null, reject the request
  if (!type || !amount) return res.status(400).send("Invalid request");

  // Get all passes available
  const AllPasses = Passes();

  const returnPass: ApiColorValue[] = [];

  // Check which pass the user requests
  // Check if any is the requirement
  if (type === "ANY") {
    for (let i = 0; i < +amount!; i++) {
      // Choose which type of color to send to the frontend
      const ChoosenPass = AllPasses[Random(0, AllPasses.length + 1)];
      let ColorValue: ApiColorValue = {
        type: ChoosenPass.type,
      };
      for (const key in ChoosenPass) {
        if (key === "type") continue;
        // Begin randomizing the value provided in the array
        ColorValue[key] = Random(+ChoosenPass[key][0], +ChoosenPass[key][1]);
      }
      returnPass.push(ColorValue);
    }
  } else if (AllPasses.some((Pass) => Pass.type === type)) {
    // In the case of only selecting certain color type format
    // Get the selected pass
    const ChoosenPass = AllPasses.filter((Pass) => Pass.type === type)[0];
    for (let i = 0; i < +amount; i++) {
      let ColorValue: ApiColorValue = {
        type: ChoosenPass.type,
      };
      // Generate colors
      for (const key in ChoosenPass) {
        if (key === "type") continue;
        // Begin randomizing the value provided in the array
        ColorValue[key] = Random(+ChoosenPass[key][0], +ChoosenPass[key][1]);
      }
      returnPass.push(ColorValue);
    }
  } else {
    // Invalid type
    return res.status(400).send("Invalid type");
  }
  res.status(200).send(returnPass);
}

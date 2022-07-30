import { NextApiRequest, NextApiResponse } from "next";
import Passes from "../../components/pass/ColorPass";

// Get all types available
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const AllPasses = Passes();
  const types = AllPasses.map((pass) => pass.type);
  res.status(200).send(types);
}

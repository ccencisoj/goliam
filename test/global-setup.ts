import path from "path";
import dotenv from "dotenv-flow";
import dockerCompose from "docker-compose";

const globalSetup = async ()=> {
  dotenv.config();

  await dockerCompose.upAll({cwd: path.join(__dirname)});
}

export default globalSetup;

import { injectable } from "inversify";
import "reflect-metadata";
import { MntsDataMapperInterface } from "./mnts-data-mapper-interface";

@injectable()
class MntsDataMapper implements MntsDataMapperInterface {
    mapRepos(repos: any[]): any[] {
        console.log(repos);

        return repos;
    }
}

export default MntsDataMapper;
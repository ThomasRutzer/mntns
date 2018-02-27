import MntsDataMapper from './mnts-data-mapper';
import { MntsDataMapperInterface } from "./";
import { expect } from 'chai';

describe('Mnts Data Mapper', () => {
    let mapper: MntsDataMapperInterface = null;
    const mappers = [
        {
            dataKey: "size",
            mountainsParameter: "height",
            min: 0,
            max: 50,
            type: "number",
        },
    ];

    const data = [
        {
            "id": 87546623,
            "name": "mntns",
            "description": null,
            "created_at": "2017-04-07T13:08:11Z",
            "updated_at": "2017-11-16T22:00:14Z",
            "pushed_at": "2018-02-26T11:29:24Z",
            "homepage": null,
            "size": 1407,
            "forks_count": 0,
            "mirror_url": null,
            "archived": false,
            "open_issues_count": 0,
            "license": null,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master"
        },
        {
            "id": 118357197,
            "name": "portfolio",
            "created_at": "2018-01-21T17:28:58Z",
            "updated_at": "2018-02-14T10:42:58Z",
            "pushed_at": "2018-02-26T11:34:12Z",
            "git_url": "git://github.com/ThomasRutzer/portfolio.git",
            "ssh_url": "git@github.com:ThomasRutzer/portfolio.git",
            "clone_url": "https://github.com/ThomasRutzer/portfolio.git",
            "svn_url": "https://github.com/ThomasRutzer/portfolio",
            "homepage": null,
            "size": 549,
            "stargazers_count": 0,
            "watchers_count": 0,
            "has_issues": true,
            "has_projects": true,
            "has_downloads": true,
            "has_wiki": true,
            "has_pages": false,
            "forks_count": 0,
            "mirror_url": null,
            "archived": false,
            "open_issues_count": 0,
            "license": null,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master"
        }
    ];

    beforeEach(() => {
       mapper = new MntsDataMapper();
    });

    it('maps every entry of data array', () => {
        const mappedData = mapper.mapRepos(data, mappers);
        expect(mappedData.length).to.equal(data.length)
    })

    it('maps properly', () => {
        const mappedData = mapper.mapRepos(data, mappers);
        expect(mappedData[0].height).to.equal(50)
        expect(mappedData[1].height).to.equal(0)
    })
});
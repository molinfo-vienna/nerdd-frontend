## [1.1.14](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.13...v1.1.14) (2025-07-12)


### Bug Fixes

* Add error prop to DeleteJobDialog ([dc17f21](https://github.com/molinfo-vienna/nerdd-frontend/commit/dc17f21f5fe1ac0eb9c4dddb4bf156494a5116a0))
* Delete delete logic from DeleteJobDialog ([3edce8c](https://github.com/molinfo-vienna/nerdd-frontend/commit/3edce8c0bb75a48b1a44808a3156021b5c910848))
* Do not import full bootstrap js bundle ([f955120](https://github.com/molinfo-vienna/nerdd-frontend/commit/f95512048938199bfb3c378771cef66b8d08cf59))
* Explicitly use state in DeleteJobDialog ([00b2e0f](https://github.com/molinfo-vienna/nerdd-frontend/commit/00b2e0f898d855f10b8483f4f9d399a9e47c36aa))
* Extract modal from ActionButton ([45874bc](https://github.com/molinfo-vienna/nerdd-frontend/commit/45874bc0de960ee0213284e7983f9527e9eefa4a))
* Install bootstrap types ([6875095](https://github.com/molinfo-vienna/nerdd-frontend/commit/687509524f7f06344636d596c9895b86adc30317))
* Move error message in DeleteJobDialog ([ac7dee4](https://github.com/molinfo-vienna/nerdd-frontend/commit/ac7dee40ab409f0ef5a650efd91fa21c71c36380))
* Move modal and deletion logic to DeleteActionButton ([662bb27](https://github.com/molinfo-vienna/nerdd-frontend/commit/662bb27539d3d82263a3fae669aa9b9a5ed25bf7))
* Report errors during job deletion ([382162c](https://github.com/molinfo-vienna/nerdd-frontend/commit/382162ce64a32dbb1b528b13ba90811f91ba7aae))

## [1.1.13](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.12...v1.1.13) (2025-07-12)


### Bug Fixes

* Remove trailing slashes in request urls (again :D) ([dd5e88c](https://github.com/molinfo-vienna/nerdd-frontend/commit/dd5e88c23f5d9c9206342bec7fe4c18fe23dd04d))
* Use prefix slashes in request urls (again) to improve readability ([7dadbde](https://github.com/molinfo-vienna/nerdd-frontend/commit/7dadbde2a675af5f595811541f161591ea1597bc))

## [1.1.12](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.11...v1.1.12) (2025-07-11)


### Bug Fixes

* Remove slashes at the start of query urls ([0859064](https://github.com/molinfo-vienna/nerdd-frontend/commit/0859064099bec209f70cf04c3422ac4ce7c8dc18))

## [1.1.11](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.10...v1.1.11) (2025-07-11)


### Bug Fixes

* Avoid JSON.stringify when submitting job parameters ([5cea1e8](https://github.com/molinfo-vienna/nerdd-frontend/commit/5cea1e8680d5156a89b7c210e44b8a6ac586e235))

## [1.1.10](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.9...v1.1.10) (2025-07-11)


### Bug Fixes

* Avoid json objects for encoding jobs ([04d5184](https://github.com/molinfo-vienna/nerdd-frontend/commit/04d518454195e7172aed9ec440c036e5d55ccdc7))
* Change parameters of addJobMutation ([4411953](https://github.com/molinfo-vienna/nerdd-frontend/commit/4411953742606728dcb0a0a2bd01cba74689a7a9))

## [1.1.9](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.8...v1.1.9) (2025-07-08)


### Bug Fixes

* Fix positioning of problem icons ([69c6eea](https://github.com/molinfo-vienna/nerdd-frontend/commit/69c6eeafe4660397edf261bc83dc56f1ea3f9f0e))
* Show message when no colorable columns were seleted ([0384e0b](https://github.com/molinfo-vienna/nerdd-frontend/commit/0384e0b65943035d3554699e05d5674ffa1c94a6))

## [1.1.8](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.7...v1.1.8) (2025-07-08)


### Bug Fixes

* Adapt components using ProblemIcon ([9331611](https://github.com/molinfo-vienna/nerdd-frontend/commit/933161134ec995b56481ca1e858ad39b71ef5a78))
* Add class for error icon style ([478c7a7](https://github.com/molinfo-vienna/nerdd-frontend/commit/478c7a74fdbf2a7fdbe8c08b12ff80f497c78fc3))
* Align table cell containing problems to the left ([18f6ced](https://github.com/molinfo-vienna/nerdd-frontend/commit/18f6ced290986775621734a8a1c80282f486dd51))
* Extend ProblemIcon component ([2a6c11b](https://github.com/molinfo-vienna/nerdd-frontend/commit/2a6c11bafeca18a01a7e9546897b7055256ecc01))
* Extract molecule styles into separate stylesheet ([5350fb9](https://github.com/molinfo-vienna/nerdd-frontend/commit/5350fb94ae53b4df2be955d1737c73d75d70dfb1))
* Extract ProblemIcon styles into separate stylesheet ([e112c05](https://github.com/molinfo-vienna/nerdd-frontend/commit/e112c0523616322466dc3e4c708b708b43b6c6c4))
* Keep table cells static when hovering molecules ([0718ee2](https://github.com/molinfo-vienna/nerdd-frontend/commit/0718ee286ca8a0a8bdbdf1de79ec7541351faeb2))
* Make image columns scale up on hover ([35b8979](https://github.com/molinfo-vienna/nerdd-frontend/commit/35b89798d7941cb651879f29c63f3fd8233c5fa4))
* Refactor molecule image depiction and add comments ([fe42424](https://github.com/molinfo-vienna/nerdd-frontend/commit/fe42424ed2b0df331c7e952cb053c20ac6970a1f))
* Use bootstrap classes for handling overflow in table ([3728b66](https://github.com/molinfo-vienna/nerdd-frontend/commit/3728b66c982cedac7d1b8b6d45b55bf2803701e7))

## [1.1.7](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.6...v1.1.7) (2025-07-06)


### Bug Fixes

* Add small padding on module card text ([ec593ea](https://github.com/molinfo-vienna/nerdd-frontend/commit/ec593ea802e4e6023cedd26c719eb6326eeeb283))

## [1.1.6](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.5...v1.1.6) (2025-07-06)


### Bug Fixes

* Add style enabling tooltips on button group items ([cd91305](https://github.com/molinfo-vienna/nerdd-frontend/commit/cd91305f28130e3d5f136c1ad2bf8fb1b1102ca3))
* Add tooltip on disabled download button ([504a034](https://github.com/molinfo-vienna/nerdd-frontend/commit/504a0344f6ba09412f4f332eecd04c5c6d2d647c))
* Add type in ProblemIcon ([433fc74](https://github.com/molinfo-vienna/nerdd-frontend/commit/433fc74689139e3763eeeb6cb541b7c74a1655da))
* Create separate tooltip component ([875e074](https://github.com/molinfo-vienna/nerdd-frontend/commit/875e074bb3c0f22b64179a40efe13f3e277a98dc))
* Enable tooltips on ActionButton ([9533420](https://github.com/molinfo-vienna/nerdd-frontend/commit/95334206b9620b7959ee783d0eeebda240568e95))
* Use tooltip component in ProblemIconWithTooltip ([7736a8f](https://github.com/molinfo-vienna/nerdd-frontend/commit/7736a8ff93720c1985ce03893bdc570f06330dcf))

## [1.1.5](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.4...v1.1.5) (2025-07-04)


### Bug Fixes

* Show only visible columns in color select dropdown ([8464a9e](https://github.com/molinfo-vienna/nerdd-frontend/commit/8464a9ed96e3fa6ecd55db253bb856f74d55bf2c))

## [1.1.4](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.3...v1.1.4) (2025-06-14)


### Bug Fixes

* Install types for lodash ([f3e81ce](https://github.com/molinfo-vienna/nerdd-frontend/commit/f3e81ce9dae862d76e1cf6fd207b9d23758e1166))

## [1.1.3](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.2...v1.1.3) (2025-06-14)


### Bug Fixes

* Color columns according to redux state ([bd2d0d7](https://github.com/molinfo-vienna/nerdd-frontend/commit/bd2d0d7a8929cfd1cf694d5c203f6af8487052e2))
* Connect coloring components with redux state ([4149f31](https://github.com/molinfo-vienna/nerdd-frontend/commit/4149f31f2e98ce21bdb82ac65430b607fb2d0b56))
* List colorable columns in ColorSelectDropdown ([904fe9b](https://github.com/molinfo-vienna/nerdd-frontend/commit/904fe9b38dd9f5a3ee5deee24eeca204bf02fd7e))
* Make column coloring configurable ([0d78ed6](https://github.com/molinfo-vienna/nerdd-frontend/commit/0d78ed699528a3bbd67b1dac100a2ff39a7a869b))

## [1.1.2](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.1...v1.1.2) (2025-06-13)


### Bug Fixes

* Do not drill atomColorProperty through components ([fdd3978](https://github.com/molinfo-vienna/nerdd-frontend/commit/fdd3978f7e1ae7ddf2693fa691969cf78a7ccbf1))
* Do not pass atomColorProperty to results table ([aa141ce](https://github.com/molinfo-vienna/nerdd-frontend/commit/aa141ce17215234239ebe315b408700c113bb7eb))
* Get atomColorProperty from redux state ([b9c03b9](https://github.com/molinfo-vienna/nerdd-frontend/commit/b9c03b9d11b59aa1244e527bcbdc3a82ebfbd0b9))
* Make group a required prop in Molecule ([3f273f8](https://github.com/molinfo-vienna/nerdd-frontend/commit/3f273f86bbd7138f72ea6c6b9dc258cdd16a6370))
* Remove unused variable ([ae72dcb](https://github.com/molinfo-vienna/nerdd-frontend/commit/ae72dcbbcc1949572c16084f7411c66d3ee1f4d6))
* Use correct type for group in Molecule component ([af57de7](https://github.com/molinfo-vienna/nerdd-frontend/commit/af57de705f6c44785d6bbcc40faa522a09982925))

## [1.1.1](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.0...v1.1.1) (2025-06-13)


### Bug Fixes

* Adapt ColorSelectDropdown to redux state ([528a19c](https://github.com/molinfo-vienna/nerdd-frontend/commit/528a19ce0a4cae6c80e29c92075a2662da6e7b55))
* Adapt ColumnSelectDropdown to redux state ([224931b](https://github.com/molinfo-vienna/nerdd-frontend/commit/224931bf1ddca2f96c18b6262fad075f755606eb))
* Adapt ResultsPage to redux state ([2b489c0](https://github.com/molinfo-vienna/nerdd-frontend/commit/2b489c0941cc01362b6c49a2b9e4b5da6f7abff4))
* Add result table slice to store ([345a4f5](https://github.com/molinfo-vienna/nerdd-frontend/commit/345a4f5fc16136c8bea15d436f339f6447c3651a))
* Convert normalize to typescript ([e472b3d](https://github.com/molinfo-vienna/nerdd-frontend/commit/e472b3d497ba0fd2fa747981f80b242cc7e79f93))
* Define type for prediction tasks ([f0562a8](https://github.com/molinfo-vienna/nerdd-frontend/commit/f0562a868aac55da81e42859ec206438dd234086))
* Implement result table slice ([9146d7b](https://github.com/molinfo-vienna/nerdd-frontend/commit/9146d7bb6c03c903d6454b8c14dbe3bd301e9d77))
* Make sure that one column is shown when user deselects all ([b89c16d](https://github.com/molinfo-vienna/nerdd-frontend/commit/b89c16d0bdb3357c90e884e581d014374ed4e90e))
* Move getColumnRows to selectors ([497554a](https://github.com/molinfo-vienna/nerdd-frontend/commit/497554a4ef5c15f81d768c5a479a3bf20e4b17cf))
* Move result grouping into selector ([d87e6e8](https://github.com/molinfo-vienna/nerdd-frontend/commit/d87e6e8652eadafb850457b897334414b6bb53e9))
* Normalize group field in result properties ([04f92c1](https://github.com/molinfo-vienna/nerdd-frontend/commit/04f92c13dbcb6a1666acd9f960a47ea919a786f7))
* Remove unused type ([114c320](https://github.com/molinfo-vienna/nerdd-frontend/commit/114c3202e1d724b6cac48dad29f72598bda1a4fe))
* Set a default value for module tasks ([d47b8bd](https://github.com/molinfo-vienna/nerdd-frontend/commit/d47b8bd250919798e28a1a3405158b37f84adf84))
* Simplify ResultTable by using redux state ([d391a85](https://github.com/molinfo-vienna/nerdd-frontend/commit/d391a858457aac58572b1793bb1446a5a3933d15))
* Simplify table components by using redux state ([82b909a](https://github.com/molinfo-vienna/nerdd-frontend/commit/82b909a5e563de19a92d300898050c5956920093))
* Skip requests if parameters not defined ([22806f8](https://github.com/molinfo-vienna/nerdd-frontend/commit/22806f8e9864b6d35a5120accc840ef99f34adfe))
* Update ResultProperty type ([368d5a9](https://github.com/molinfo-vienna/nerdd-frontend/commit/368d5a92288ea484c70c4149760b5a112f8863de))
* Use correct fields to uniquely identiy records and properties ([58aee9a](https://github.com/molinfo-vienna/nerdd-frontend/commit/58aee9a003a97e64b965bbe474f9ee2aac701fcd))
* Use correct path in hooks.ts ([0aab1ad](https://github.com/molinfo-vienna/nerdd-frontend/commit/0aab1ad3e4be0b9f9b6c2ccdd39a9332c5a1361c))
* Use typescript for services/index.js ([3c979d0](https://github.com/molinfo-vienna/nerdd-frontend/commit/3c979d08ff3b65e684821fdf71abef37c4c56ea0))

# [1.1.0](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.28...v1.1.0) (2025-06-11)


### Bug Fixes

* Compress pagination text on small screens ([fa2ec6f](https://github.com/molinfo-vienna/nerdd-frontend/commit/fa2ec6f695daf9a095f148bf3979cfd04c5e839c))
* Hide button labels on small screens ([22e36b2](https://github.com/molinfo-vienna/nerdd-frontend/commit/22e36b26d2fd255796fc3c1df40619682cbf7109))
* Make results table responsive on small screens ([3f37df1](https://github.com/molinfo-vienna/nerdd-frontend/commit/3f37df1a3f42ba741e3a0065e621b50716d3cc58))
* Move results header into separate feature folder ([2e8dafb](https://github.com/molinfo-vienna/nerdd-frontend/commit/2e8dafbe6a4972159b03112b16b6570a0747cf80))
* Tune the viewbox of all button icons ([bf85778](https://github.com/molinfo-vienna/nerdd-frontend/commit/bf85778f4373b72d1fb66d0e0866a957c4cd7388))


### Features

* Make app mobile again (MAMA) ([c016af2](https://github.com/molinfo-vienna/nerdd-frontend/commit/c016af2e53807aedfcc9e8d22286a6dcff7cde2b))

## [1.0.28](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.27...v1.0.28) (2025-06-10)


### Bug Fixes

* Add altcha dependency ([c0bf7ff](https://github.com/molinfo-vienna/nerdd-frontend/commit/c0bf7ff4b07eb66ce7f84cf913d56d4a83632de4))
* Implement altcha component ([56af9c8](https://github.com/molinfo-vienna/nerdd-frontend/commit/56af9c87e2c89e5a01d1dc40a0e600cb82d493a0))

## [1.0.27](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.26...v1.0.27) (2025-06-09)


### Bug Fixes

* Add parameter to indicate origin of request ([c9d7525](https://github.com/molinfo-vienna/nerdd-frontend/commit/c9d75254ea5edf8adfc9b153981ba2d3d9a6616e))
* Return errors in form submit handler ([5628a97](https://github.com/molinfo-vienna/nerdd-frontend/commit/5628a97625efb4afd0c8d7e4e6fff3d1a04e06e8))
* Simplify job submission logic ([0259dd4](https://github.com/molinfo-vienna/nerdd-frontend/commit/0259dd4a7506b64ff25604e2caa0dcc262391ef3))

## [1.0.26](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.25...v1.0.26) (2025-06-01)


### Bug Fixes

* Add proxy config ([f4b2f62](https://github.com/molinfo-vienna/nerdd-frontend/commit/f4b2f626df105ecf4bc9528a757ff64745e6c463))

## [1.0.25](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.24...v1.0.25) (2025-05-30)


### Bug Fixes

* Adapt icon sizes ([842efec](https://github.com/molinfo-vienna/nerdd-frontend/commit/842efec57cbf9df4405cddf9868f75a3ad614786))
* Align button icons on result page ([cdf0dcf](https://github.com/molinfo-vienna/nerdd-frontend/commit/cdf0dcf4552b140762a45c627c387cb8c9760014))
* Always render the bottom border of the ResultTable's head ([f27c8c6](https://github.com/molinfo-vienna/nerdd-frontend/commit/f27c8c61558913c21e0c79f8a4f5f8bac1b076b1))
* Center error icons ([14d6518](https://github.com/molinfo-vienna/nerdd-frontend/commit/14d65187df0c71c3079c9c62921777431d476e2a))
* Reduce font size of error icons ([69c58c2](https://github.com/molinfo-vienna/nerdd-frontend/commit/69c58c2047692959e764f65b586d57562a97588a))
* Render modals as direct children of body ([09374ac](https://github.com/molinfo-vienna/nerdd-frontend/commit/09374ac9b9fb12c3a66b449a2fcbe874d9e981f8))
* Simplify problem icon style ([ea40ec9](https://github.com/molinfo-vienna/nerdd-frontend/commit/ea40ec9c773b81eea121797333d7729e1b2b5943))
* Simplify ResultsHeader component ([8926536](https://github.com/molinfo-vienna/nerdd-frontend/commit/8926536ebd96501d8559d90d1beba1d8b3774cb0))
* Simplify styles in file upload ([17f404f](https://github.com/molinfo-vienna/nerdd-frontend/commit/17f404f7cdb7ca4968af1d9d7e1cc68ec1e280d6))
* Simplify styles in header ([0ae1d8b](https://github.com/molinfo-vienna/nerdd-frontend/commit/0ae1d8b95e1d795ebac3b9a97fa72f2fe5df0902))
* Simplify styles in module card ([cc134c7](https://github.com/molinfo-vienna/nerdd-frontend/commit/cc134c70e1509f77db0c235ffdb89dd95577b8fc))
* Simplify styles in result table ([9c56c65](https://github.com/molinfo-vienna/nerdd-frontend/commit/9c56c65159ce8f25107dc553b9ce6e864a600f33))
* Use a different danger color ([9dd2951](https://github.com/molinfo-vienna/nerdd-frontend/commit/9dd295136b5470c47c62fd4cbaa045871829e4de))
* Use bootstrap classes in TableOfContents ([23d8310](https://github.com/molinfo-vienna/nerdd-frontend/commit/23d83108caf5a3a6a8018f34cb469f654805ea59))
* Use css extension for style in TangleRuntime ([5b33f82](https://github.com/molinfo-vienna/nerdd-frontend/commit/5b33f8219c6a3d92d2b45b3b04f4ea135b99e8b0))

## [1.0.24](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.23...v1.0.24) (2025-05-27)


### Bug Fixes

* Add missing fields to JobStatus type ([70ee9f2](https://github.com/molinfo-vienna/nerdd-frontend/commit/70ee9f2d2352ea0a0e35e42da53a7bc9f7970532))
* Add trailing slash to requests ([6f0b1f0](https://github.com/molinfo-vienna/nerdd-frontend/commit/6f0b1f00f93c443269fa26550ad17fcebc4caa6f))
* Let mock websocket server listen on route with trailing slash ([c607e21](https://github.com/molinfo-vienna/nerdd-frontend/commit/c607e21e7ec3c56d5095f4b4952e9a23b57613c4))
* Simplify ResultsPage component ([abda96b](https://github.com/molinfo-vienna/nerdd-frontend/commit/abda96b271c61353f2eb979b50e20fc31303d849))

## [1.0.23](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.22...v1.0.23) (2025-05-23)


### Bug Fixes

* Update Actions workflow and Dockerfiles for arm64 compatibility ([a491862](https://github.com/molinfo-vienna/nerdd-frontend/commit/a4918624f2c0a0bb31ef3df0955fd19e8a8e81de))

## [1.0.22](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.21...v1.0.22) (2025-05-22)


### Bug Fixes

* Put rendering logic into Root component ([3432875](https://github.com/molinfo-vienna/nerdd-frontend/commit/34328750117cd54074492f0f71ec1276bae7075a))
* Separate debug rendering from context provider ([0ab37b8](https://github.com/molinfo-vienna/nerdd-frontend/commit/0ab37b8bf8e30c151502880cdca4f5b37799a073))

## [1.0.21](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.20...v1.0.21) (2025-05-16)


### Bug Fixes

* Add missing dependencies to useMemo, useEffect and useCallback hooks ([c9959a6](https://github.com/molinfo-vienna/nerdd-frontend/commit/c9959a6a70e84c04e96c54ec20a82e0b1acbd375))
* Avoid infinite rerendering loop in JobForm ([2ee420a](https://github.com/molinfo-vienna/nerdd-frontend/commit/2ee420a1e12caaefec777158f4b5b0b2285e9136))
* Avoid restarting RTK query engine ([977a6f1](https://github.com/molinfo-vienna/nerdd-frontend/commit/977a6f16fe7d1f64d83f4950ab36a075ca58ed03))
* Make sure that arrays in module are always defined ([1ea8829](https://github.com/molinfo-vienna/nerdd-frontend/commit/1ea882908569b42e4cb1dce47e80ff66700acc92))
* Move app hooks to separate folder ([4ac0423](https://github.com/molinfo-vienna/nerdd-frontend/commit/4ac04235bd03128ce4b53ad1d98945125a4e78b8))
* Move redux store into the app folder ([bd58d05](https://github.com/molinfo-vienna/nerdd-frontend/commit/bd58d050e5e30bda9c1a23bd5d1153f995ca550f))
* Move routing rules into app folder ([a038d6d](https://github.com/molinfo-vienna/nerdd-frontend/commit/a038d6ddff4109022e07bd884f63cf5d9d481d13))
* Move scroll-up logic into Layout ([0a0bf75](https://github.com/molinfo-vienna/nerdd-frontend/commit/0a0bf753a8fce83c09cbd14412992a45931dd13e))
* Pass rows to Textarea ([2dd87db](https://github.com/molinfo-vienna/nerdd-frontend/commit/2dd87db514da39ed0dd5c6eecc6adbd76f5fa743))
* Propagate websocket results correctly ([e97de68](https://github.com/molinfo-vienna/nerdd-frontend/commit/e97de6813d4d7b8f42af6b7e91460465f88a358b))
* Provide initial value for useRef ([998ca4e](https://github.com/molinfo-vienna/nerdd-frontend/commit/998ca4e12e9ae359a12e8fcb613945d04106569f))
* Remove @babel/plugin-proposal-private-property-in-object ([dd4728b](https://github.com/molinfo-vienna/nerdd-frontend/commit/dd4728b5321b19e06d25fc00fc987378fdcd0d3d))
* Structure base code using providers ([3846705](https://github.com/molinfo-vienna/nerdd-frontend/commit/384670558ed60548da627173e16cb5aa3e799aba))
* Use classnames in ErrorPage ([f0f8bdd](https://github.com/molinfo-vienna/nerdd-frontend/commit/f0f8bdde75e3ef0825fac481a8a3f39dc574025c))
* Use providers in index.tsx ([2b8da52](https://github.com/molinfo-vienna/nerdd-frontend/commit/2b8da52bd5b20e72220e9767be40731337abc500))

## [1.0.20](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.19...v1.0.20) (2025-04-21)


### Bug Fixes

* Add vite bundle analyzer ([ebb6d6d](https://github.com/molinfo-vienna/nerdd-frontend/commit/ebb6d6de9d77c8aac400e50d6d9635824fc67489))
* Add vitest config ([b3a4f87](https://github.com/molinfo-vienna/nerdd-frontend/commit/b3a4f87abb8c3e9a24959550069984f52e5a6b69))
* Remove react-scripts ([f092b49](https://github.com/molinfo-vienna/nerdd-frontend/commit/f092b497d5d06978a52d4e65f3b7a987f9501d96))
* Run npm audit fix ([c796ab6](https://github.com/molinfo-vienna/nerdd-frontend/commit/c796ab693fb9f4954231ef9a086cead52b417605))
* Update reduxjs/toolkit ([061092f](https://github.com/molinfo-vienna/nerdd-frontend/commit/061092f7492602f80f7729702b8695f263927218))

## [1.0.19](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.18...v1.0.19) (2025-04-19)


### Bug Fixes

* Migrate project to vite ([78d1a74](https://github.com/molinfo-vienna/nerdd-frontend/commit/78d1a74a5684642a6074fdbae387b435ec9eb659))
* Use jsx extension for files with JSX markup ([24925c6](https://github.com/molinfo-vienna/nerdd-frontend/commit/24925c6bdd9993e0485575772b9bcb5aee8fb840))

## [1.0.18](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.17...v1.0.18) (2025-04-18)


### Bug Fixes

* Remove labels from SMILES before passing to JSME ([354ddf3](https://github.com/molinfo-vienna/nerdd-frontend/commit/354ddf3478f1fb78adebf2aa9cb0a13b9d026b99))

## [1.0.17](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.16...v1.0.17) (2025-04-18)


### Bug Fixes

* Avoid refetching molecule images ([a3a9bd0](https://github.com/molinfo-vienna/nerdd-frontend/commit/a3a9bd095982bf29e4504b7e371047b30eaf027a))
* Prerender all table cells and hide unselected ([5ed7fc6](https://github.com/molinfo-vienna/nerdd-frontend/commit/5ed7fc6e1773899970977e6d90b5fbd5a790b4c1))
* Put color palettes into result property objects ([621a3c0](https://github.com/molinfo-vienna/nerdd-frontend/commit/621a3c0431bd0598a24868c767a505fca0dd2d78))
* Put visibility flag into result property objects ([8d4db90](https://github.com/molinfo-vienna/nerdd-frontend/commit/8d4db90f669a97c90a2f9dc758dddf87570d1c66))
* Use transparent colors as fallback ([3335481](https://github.com/molinfo-vienna/nerdd-frontend/commit/333548157bf6e3b9eb878390835c585fecb7b917))

## [1.0.16](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.15...v1.0.16) (2025-04-14)


### Bug Fixes

* Color atoms even if color property is hidden ([31e1f20](https://github.com/molinfo-vienna/nerdd-frontend/commit/31e1f208f9df77b38e8706a66d776a50bbf4d2fd))
* Show one column if all columns are deselected ([773b5dc](https://github.com/molinfo-vienna/nerdd-frontend/commit/773b5dcc84065d8bd2b5505c0ed59f6bc9bbb4ce))
* Use <ul> in ColumnSelectDropdown ([dad613a](https://github.com/molinfo-vienna/nerdd-frontend/commit/dad613abf05eae2b93214b66e42c9bd6126d051b))

## [1.0.15](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.14...v1.0.15) (2025-04-14)


### Bug Fixes

* Highlight cells correctly if column block has only one column ([0b14f1b](https://github.com/molinfo-vienna/nerdd-frontend/commit/0b14f1b1ec7fbf42ba37d60f54b8d2f3b3796809))

## [1.0.14](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.13...v1.0.14) (2025-04-14)


### Bug Fixes

* Add color selection feature to ResultPage ([e8ad457](https://github.com/molinfo-vienna/nerdd-frontend/commit/e8ad4579313fd1058512d994971222558047e6fe))
* Color atoms in Molecule component ([a163c30](https://github.com/molinfo-vienna/nerdd-frontend/commit/a163c30b803838899ec4197e4def28e9f3928cf5))
* Forward atomColorPalette to Molecule component ([79b8a9f](https://github.com/molinfo-vienna/nerdd-frontend/commit/79b8a9fe47f5a772afd05912528a109300575cd3))

## [1.0.13](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.12...v1.0.13) (2025-04-14)


### Bug Fixes

* Let websocket reconnect if the error reason is 'timeout' ([7cd63f8](https://github.com/molinfo-vienna/nerdd-frontend/commit/7cd63f89afdac5e5f661408c8da33310db1e58f0))

## [1.0.12](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.11...v1.0.12) (2025-04-12)


### Bug Fixes

* Use flex column flow in Layout content ([2f5e725](https://github.com/molinfo-vienna/nerdd-frontend/commit/2f5e725735d14b046bc75546fa8ceb832d3e6c8a))

## [1.0.11](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.10...v1.0.11) (2025-04-12)


### Bug Fixes

* Cache table groups based on mol ids ([ccad95c](https://github.com/molinfo-vienna/nerdd-frontend/commit/ccad95c898d2ac03d9ac4e8dff22c3d0f7800907))

## [1.0.10](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.9...v1.0.10) (2025-04-12)


### Bug Fixes

* Improve table borders ([0153266](https://github.com/molinfo-vienna/nerdd-frontend/commit/0153266c792023b33654d07412686721bb6888d3))

## [1.0.9](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.8...v1.0.9) (2025-04-10)


### Bug Fixes

* Update style for table row highlight ([73436ab](https://github.com/molinfo-vienna/nerdd-frontend/commit/73436aba4c2e42a957188756c9c2be3b04d5e675))

## [1.0.8](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.7...v1.0.8) (2025-04-10)


### Bug Fixes

* Compute start and end of atom / derivative column blocks ([00f0d16](https://github.com/molinfo-vienna/nerdd-frontend/commit/00f0d16e2bc174d6fbc0e86d6f6830f1b060bbdf))
* Highlight table cells using borders ([e808386](https://github.com/molinfo-vienna/nerdd-frontend/commit/e808386288ce3452e7c0684a3476370656f008f8))

## [1.0.7](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.6...v1.0.7) (2025-04-10)


### Bug Fixes

* Construct color palette objects correctly ([1936459](https://github.com/molinfo-vienna/nerdd-frontend/commit/19364596df75b544a4aac327a8ccff2d7962ab8e))

## [1.0.6](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.5...v1.0.6) (2025-04-05)


### Bug Fixes

* Specify color for unknown values in categorical properties ([480cf01](https://github.com/molinfo-vienna/nerdd-frontend/commit/480cf01e21e9f539fcc02c47c6680b699b4f4d10))

## [1.0.5](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.4...v1.0.5) (2025-04-02)


### Bug Fixes

* Increase transition speed of animations on landing page ([9977f48](https://github.com/molinfo-vienna/nerdd-frontend/commit/9977f4867974e3a7af8bb610e4b73823291a3c16))

## [1.0.4](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.3...v1.0.4) (2025-03-29)


### Bug Fixes

* Add d3 palettes ([277cd48](https://github.com/molinfo-vienna/nerdd-frontend/commit/277cd48864ff5c35092b73e7f1244bda02409ee3))
* Add prop types to TableRowGroup ([ea83e94](https://github.com/molinfo-vienna/nerdd-frontend/commit/ea83e94d211cd3078cd1d22ab7e98c25f2496dd2))
* Add type for logRequests in MockServer ([c51a504](https://github.com/molinfo-vienna/nerdd-frontend/commit/c51a504d411a8448ed8438d1d893528bfbded850))
* Color table cells ([f8c11fe](https://github.com/molinfo-vienna/nerdd-frontend/commit/f8c11fe01b7c8a79bbefc5f70dcc366760227199))
* Compute color palettes for result properties ([41849c6](https://github.com/molinfo-vienna/nerdd-frontend/commit/41849c6ed4b068549556895923b5eafb5857246f))
* Extract colors from bootstrap variables in javascript ([9f0267b](https://github.com/molinfo-vienna/nerdd-frontend/commit/9f0267bc953a2cc8e37d7d7ff69e9bf3cb7c4f62))
* Generate color palette fields in fake data ([b29dea4](https://github.com/molinfo-vienna/nerdd-frontend/commit/b29dea49b8f21d7e702e8b7213876ae8494713ce))
* Merge website and d3 palettes ([7c6544c](https://github.com/molinfo-vienna/nerdd-frontend/commit/7c6544caa67bcd0cb487c7b7b5b0d3c0b12bb39d))
* Remove semicolon ([e7a080a](https://github.com/molinfo-vienna/nerdd-frontend/commit/e7a080af2bf030b5c18ea56b33b3b20bdc78590d))

## [1.0.3](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.2...v1.0.3) (2025-03-14)


### Bug Fixes

* Make navigation bar responsive ([078c634](https://github.com/molinfo-vienna/nerdd-frontend/commit/078c634fb0d042a5342c47ee1173301ac459d626))
* Never delete singleton applet instance ([17a255b](https://github.com/molinfo-vienna/nerdd-frontend/commit/17a255b6d35bec4abbe769da93b2c4079b02fbd9))
* Vertically center navigation bar entries ([e31a8f7](https://github.com/molinfo-vienna/nerdd-frontend/commit/e31a8f7a089992aea47eaae654a1c4f5968db1c3))

## [1.0.2](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.1...v1.0.2) (2025-03-04)


### Bug Fixes

* Add a Dockerfile for development (hot reload) ([3fea9a7](https://github.com/molinfo-vienna/nerdd-frontend/commit/3fea9a7d45db5de8797e0573657b1397fd6c9cda))
* Add docker files to dockerignore ([40129b9](https://github.com/molinfo-vienna/nerdd-frontend/commit/40129b9b14430dfafdf57bcfe6c97385cbf74833))
* Add option to use example molecule ([99d5ca2](https://github.com/molinfo-vienna/nerdd-frontend/commit/99d5ca2fe031f513fa63e7caf7e30ed545a6a354))
* Add width, height and depiction mode parameters to MoleculeEditor ([bad788d](https://github.com/molinfo-vienna/nerdd-frontend/commit/bad788d950d22ae9e4f033725e5349907528c963))
* Implement MoleculeEditorField (react-final-form) ([6fe401d](https://github.com/molinfo-vienna/nerdd-frontend/commit/6fe401ddae12564228713618c162c11857383251))
* Make JSApplet a proper singleton ([a269f88](https://github.com/molinfo-vienna/nerdd-frontend/commit/a269f88d7d4748ebcbadfb8c330214b0d39c4354))
* Use Open Sans and Overpass as fonts ([e475d12](https://github.com/molinfo-vienna/nerdd-frontend/commit/e475d12f8ec3d10f4d4fab74419efde34ff20426))

## [1.0.1](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.0.0...v1.0.1) (2025-02-25)


### Bug Fixes

* Add documentation on font selection process ([329909f](https://github.com/molinfo-vienna/nerdd-frontend/commit/329909f3a4af7e68a873ef6a3687463147d040b0))
* Install fonts ([dc23a7e](https://github.com/molinfo-vienna/nerdd-frontend/commit/dc23a7ee5e9f7836ebb2b1e028666f00d466321b))
* Move font declaration to scss ([bec132e](https://github.com/molinfo-vienna/nerdd-frontend/commit/bec132ea1e14ab14633a7cb28acb5d2808e4ab5f))
* Re-enable MoleculeEditor on job form ([8736b56](https://github.com/molinfo-vienna/nerdd-frontend/commit/8736b56faf1db1cf961d742e28dceb72814c3fb3))
* Remove fw-bold class ([a25ca33](https://github.com/molinfo-vienna/nerdd-frontend/commit/a25ca331854f3557d4e7a1835b2cd02ba5eb8bf9))
* Repaint MoleculeEditor after mounting ([9065411](https://github.com/molinfo-vienna/nerdd-frontend/commit/9065411e7496e5b66333d9f9d817c4bfd4616dc1))
* Rewrite useJsApplet using the hook useScript ([fe30f04](https://github.com/molinfo-vienna/nerdd-frontend/commit/fe30f04f2c3f10ff6cab74b77a3efb4f0f58c8cd))

# 1.0.0 (2025-02-19)


### Bug Fixes

* Add disclaimer on landing page ([35f2524](https://github.com/molinfo-vienna/nerdd-frontend/commit/35f2524398c239749dce3392be198e26ef2eda67))
* Move nginx conf to parent project ([dea25ce](https://github.com/molinfo-vienna/nerdd-frontend/commit/dea25cefe467ffc6455cf719568c971e61c403e8))

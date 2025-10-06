## [1.3.32](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.31...v1.3.32) (2025-10-06)


### Bug Fixes

* Extend resultProperty type ([7a20327](https://github.com/molinfo-vienna/nerdd-frontend/commit/7a20327228bc890d354fed10788e9d8f328d0956))
* Implement column sorting in redux slice ([802e658](https://github.com/molinfo-vienna/nerdd-frontend/commit/802e658ee6fff0a10464aa69692419b3dcb517c6))
* Make columns sortable on UI ([2103512](https://github.com/molinfo-vienna/nerdd-frontend/commit/2103512189b41a4adad384f15448ec20c87d4332))
* Move code into new ColumnHeader component ([6abb316](https://github.com/molinfo-vienna/nerdd-frontend/commit/6abb316de3f37b5e8b290f0def30ec9e8ccbafc2))

## [1.3.31](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.30...v1.3.31) (2025-10-01)


### Bug Fixes

* Always show navigation bar ([882f45a](https://github.com/molinfo-vienna/nerdd-frontend/commit/882f45a9aa983f9d5f088ce57e8d2343e3b9177e))

## [1.3.30](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.29...v1.3.30) (2025-09-30)


### Bug Fixes

* Avoid displaying decimal places for waiting times ([b806aa5](https://github.com/molinfo-vienna/nerdd-frontend/commit/b806aa53a4f8e78baa60fdc613e31e2d3b97cff2))
* Avoid line breaks in waiting time ([4dc9bbf](https://github.com/molinfo-vienna/nerdd-frontend/commit/4dc9bbf012160c0810403a416993e1fb6934001a))
* Choose different neutral color ([30b1afc](https://github.com/molinfo-vienna/nerdd-frontend/commit/30b1afc71d9eccdd6b82f3957b3971017a3f189a))
* Show navigation bar if any molecules were processed ([a1e8035](https://github.com/molinfo-vienna/nerdd-frontend/commit/a1e8035e0c7b3430336b3ae16e4bbe7f0f636b6a))

## [1.3.29](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.28...v1.3.29) (2025-09-24)


### Bug Fixes

* Change website banner text ([cef5337](https://github.com/molinfo-vienna/nerdd-frontend/commit/cef53376c5274c3637579d522d80d10934457140))

## [1.3.28](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.27...v1.3.28) (2025-09-24)


### Bug Fixes

* Distinguish subRoute in ModuleSelectionCard ([6380c5e](https://github.com/molinfo-vienna/nerdd-frontend/commit/6380c5e523a54ec0badc22472fdad7c25f220647))
* Extract progress text on results page to separate component ([aecf965](https://github.com/molinfo-vienna/nerdd-frontend/commit/aecf96533c99a27fa879f995b6e8f804639dfe6f))
* Fetch job waiting time ([3543a98](https://github.com/molinfo-vienna/nerdd-frontend/commit/3543a98bc923f39ad9fb6b9feb5eddcc1fa51c38))
* Fetch waiting time in CreateJobHeader ([d88328b](https://github.com/molinfo-vienna/nerdd-frontend/commit/d88328bfbe8ba3e0bff8c72ee599b78ce223908c))
* Hide Navigation when no results available ([e9d8f13](https://github.com/molinfo-vienna/nerdd-frontend/commit/e9d8f131986badec6d0b2fe46a75773027416ac3))
* Implement new route for querying waiting time ([6f85039](https://github.com/molinfo-vienna/nerdd-frontend/commit/6f85039fe96ec2928e0414e584b0d618b8fd025f))
* Make TableCell aware of type synonyms ([2946628](https://github.com/molinfo-vienna/nerdd-frontend/commit/2946628d5489b8795d6d7832e0669260fb79c034))
* Memo ResultsProgress ([2dab7b8](https://github.com/molinfo-vienna/nerdd-frontend/commit/2dab7b86e238348de35ed104da929b142c0435e4))
* Move queue stats into separate type ([05d3ede](https://github.com/molinfo-vienna/nerdd-frontend/commit/05d3ede3bb6e8592211c19c74d55da8d1e287529))
* Run setValue in Tangle component within useEffect hook ([7aa2cb0](https://github.com/molinfo-vienna/nerdd-frontend/commit/7aa2cb02a795f69039f264f541a210202ea00110))
* Update waiting time estimates every 5 min ([3e59fcf](https://github.com/molinfo-vienna/nerdd-frontend/commit/3e59fcf4c020ccaafc6c2bcaeda0db9335798793))
* Use HeaderLink component in CreateJobHeader ([70af7bf](https://github.com/molinfo-vienna/nerdd-frontend/commit/70af7bf34569baf504936673806407ce46c06b81))

## [1.3.27](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.26...v1.3.27) (2025-09-23)


### Bug Fixes

* Add route for general documentation ([5ae64d9](https://github.com/molinfo-vienna/nerdd-frontend/commit/5ae64d985bea861faa1a78f8d9860cd5ead49dd9))
* Decrease icon size in header tiles ([8d86627](https://github.com/molinfo-vienna/nerdd-frontend/commit/8d86627b1646405d44abf23a5941bf2f96a81ede))
* Delete deprecated and unused components ([45b8f36](https://github.com/molinfo-vienna/nerdd-frontend/commit/45b8f36fd4ab9a5b19f486fa8b2b0bef507757fd))
* Fix footer links ([627cf3f](https://github.com/molinfo-vienna/nerdd-frontend/commit/627cf3f68fe6af1524b7fd9d22180431d9311e56))
* Improve module type ([558faba](https://github.com/molinfo-vienna/nerdd-frontend/commit/558faba0a43e2eec62d3a9ccd4edd04f379c03cb))
* Improve Publication type ([d3ca733](https://github.com/molinfo-vienna/nerdd-frontend/commit/d3ca733e1f559c9db190711cd33ffb280a0b4da6))
* Show correct links in NavigationBar when visiting api docs ([28ca8a3](https://github.com/molinfo-vienna/nerdd-frontend/commit/28ca8a3a1f21faf5ce6a7417046b7fd1bb26c655))
* Use correct links in footer ([547d7ad](https://github.com/molinfo-vienna/nerdd-frontend/commit/547d7adbff96fa0211748a1c7a4f4db108f33e21))

## [1.3.26](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.25...v1.3.26) (2025-09-22)


### Bug Fixes

* Decrease icon size ([aa49427](https://github.com/molinfo-vienna/nerdd-frontend/commit/aa49427679abf5623462777799fcc6d7f1415373))

## [1.3.25](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.24...v1.3.25) (2025-09-21)


### Bug Fixes

* Add component for tiles in CreateJobHeader ([1f741e0](https://github.com/molinfo-vienna/nerdd-frontend/commit/1f741e053cb0106d558b276c7485fe474d0fc90a))
* Add custom header to CreateJobs page ([e61ebb8](https://github.com/molinfo-vienna/nerdd-frontend/commit/e61ebb8a6038dc2a5fff70a17aadbf49f8dd5327))
* Add performance characteristics to Module type ([2873b01](https://github.com/molinfo-vienna/nerdd-frontend/commit/2873b015d65d52239dd4994903c0cd9516562d1e))
* Add waitingTimeMinutes field to Module ([42e619e](https://github.com/molinfo-vienna/nerdd-frontend/commit/42e619e8258fe9c4628c80dd471960e5def79171))
* Always show links on job form ([371b56e](https://github.com/molinfo-vienna/nerdd-frontend/commit/371b56e663cdb3dc35b6bb2e465137973f02e559))
* Generate performance characteristics in MockServer ([62dfe63](https://github.com/molinfo-vienna/nerdd-frontend/commit/62dfe630983f1d65188e88a53ccd774a173574c0))
* Generate waitingTimeMinutes in MockServer ([f159848](https://github.com/molinfo-vienna/nerdd-frontend/commit/f15984876bb3595b8dc19ad8ffd7c6ef6d853438))
* Implement separate header for CreateJobs page ([dbee3f3](https://github.com/molinfo-vienna/nerdd-frontend/commit/dbee3f3300ce936285eb426f9231d16932d016e6))
* Make Tangle component more universal ([5bef67c](https://github.com/molinfo-vienna/nerdd-frontend/commit/5bef67c3d0645f8af99eedf0cf62a859823afa93))
* Show waiting time in CreateJobsHeader ([0c4cd99](https://github.com/molinfo-vienna/nerdd-frontend/commit/0c4cd997b1ab8cbe7291b90cbd1119c7d094fc97))
* Use consistent time units ([37cea8e](https://github.com/molinfo-vienna/nerdd-frontend/commit/37cea8ea8c552b467473e0b5c190830130eb1ab6))

## [1.3.24](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.23...v1.3.24) (2025-09-18)


### Bug Fixes

* Handle case of no parameters in DocsActionButton ([be86ff7](https://github.com/molinfo-vienna/nerdd-frontend/commit/be86ff7636e1863ef24c380f7224a8636245414b))

## [1.3.23](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.22...v1.3.23) (2025-09-18)


### Bug Fixes

* Extract snakeToCamelCase util function ([fffc6e8](https://github.com/molinfo-vienna/nerdd-frontend/commit/fffc6e8338cbc2c8c3cf953307787c74e4dbbe95))
* Show job parameters on results page ([908925a](https://github.com/molinfo-vienna/nerdd-frontend/commit/908925a23e5fa41940baa01759a56b3928864588))
* Use list instead of table for parameters ([2d02a97](https://github.com/molinfo-vienna/nerdd-frontend/commit/2d02a979f5f4a342dd76219fa8b7766cfee20987))

## [1.3.22](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.21...v1.3.22) (2025-09-18)


### Bug Fixes

* Adapt ColorSelectActionButton ([3131827](https://github.com/molinfo-vienna/nerdd-frontend/commit/31318271ea94193c0478b1c437a196dd16bdae9d))
* Adapt ColumnSelectActionButton ([75205ab](https://github.com/molinfo-vienna/nerdd-frontend/commit/75205ab092185c9d591f65565160da11eadd4041))
* Adapt DownloadActionButton ([3270e43](https://github.com/molinfo-vienna/nerdd-frontend/commit/3270e4302981d7b8fb8f9b5cbecefd4d8bf04eec))
* Make ActionButton independent of dropdowns ([83d41b9](https://github.com/molinfo-vienna/nerdd-frontend/commit/83d41b9570e4dbe529f2eaccd6767ed36596e453))
* Memo click handler in DeleteActionButton ([d66ac8b](https://github.com/molinfo-vienna/nerdd-frontend/commit/d66ac8b5f3e47cfdd23b2c4d6aa52fa5e90540f7))

## [1.3.21](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.20...v1.3.21) (2025-09-17)


### Bug Fixes

* Report field-based errors after submission ([a48f3d1](https://github.com/molinfo-vienna/nerdd-frontend/commit/a48f3d1a910cf2dd08869eb8f1c37650bc1f698e))

## [1.3.20](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.19...v1.3.20) (2025-09-17)


### Bug Fixes

* Show field-based error messages ([8d286ed](https://github.com/molinfo-vienna/nerdd-frontend/commit/8d286ed7fd0ab21d4ec0da77143e4b1ba0804782))

## [1.3.19](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.18...v1.3.19) (2025-09-13)


### Bug Fixes

* Fine-tune checkbox behaviour in dropdown ([4301950](https://github.com/molinfo-vienna/nerdd-frontend/commit/430195064c473d1992903df2b8ef16af0c53068d))
* Fine-tune radio button behaviour in dropdown ([3bc0df3](https://github.com/molinfo-vienna/nerdd-frontend/commit/3bc0df329f9841e54c0e7038c77378844ff6bb3a))
* Memoize ColorSelectionActionButton ([694de3f](https://github.com/molinfo-vienna/nerdd-frontend/commit/694de3fcdaf8aa32d2a82d1ced5915cba184df48))
* Memoize ColumnSelectActionButton ([9d48a1d](https://github.com/molinfo-vienna/nerdd-frontend/commit/9d48a1d26ae23ca1313857311ff31ec58536d8ba))
* Memoize DeleteActionButton ([b8ed1eb](https://github.com/molinfo-vienna/nerdd-frontend/commit/b8ed1ebeab0bd1a46354eb4593f90ed56a0653f1))
* Memoize DocsActionButton ([0802374](https://github.com/molinfo-vienna/nerdd-frontend/commit/0802374f468da9311f6cd2569dc44bf9de7ff42e))
* Memoize DownloadActionButton ([b0ca63f](https://github.com/molinfo-vienna/nerdd-frontend/commit/b0ca63fb047fe1a6c36d777b9cf2471aaf97dcd2))
* Remove bold font on dropdown items ([46132e3](https://github.com/molinfo-vienna/nerdd-frontend/commit/46132e33860fa495f6bfb48be044bfd770a0ce07))

## [1.3.18](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.17...v1.3.18) (2025-09-05)


### Bug Fixes

* Create component for different molecule input fields ([23c794c](https://github.com/molinfo-vienna/nerdd-frontend/commit/23c794ce3af18842668b4859569a215d06f5fd4f))
* Improve Row component ([6bee0eb](https://github.com/molinfo-vienna/nerdd-frontend/commit/6bee0eb365f8278ac546a590f0ef913ed53b5282))
* Use form subscription to improve performance ([84f6b9c](https://github.com/molinfo-vienna/nerdd-frontend/commit/84f6b9ce16a6877645e4a90910132f2ff4b490b4))

## [1.3.17](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.16...v1.3.17) (2025-09-05)


### Bug Fixes

* Avoid error on chrome about type='checkbox' ([8a64c6f](https://github.com/molinfo-vienna/nerdd-frontend/commit/8a64c6f7b0d730e377e72f159fc461edf4aaf79b))

## [1.3.16](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.15...v1.3.16) (2025-09-03)


### Bug Fixes

* Close tooltips when clicking outside ([2df867a](https://github.com/molinfo-vienna/nerdd-frontend/commit/2df867aa3a1b1d92cfdee9a7ad5bc2e2468fe29f))

## [1.3.15](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.14...v1.3.15) (2025-09-03)


### Bug Fixes

* Open tooltips on click (nice for mobile) ([71c5f0d](https://github.com/molinfo-vienna/nerdd-frontend/commit/71c5f0d97d8775760f39e8a2997e6df75082208b))

## [1.3.14](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.13...v1.3.14) (2025-09-02)


### Bug Fixes

* Show light text on table cells with dark bg ([54640ff](https://github.com/molinfo-vienna/nerdd-frontend/commit/54640ffc22966d855e64ff4295aa3096aff0330b))

## [1.3.13](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.12...v1.3.13) (2025-09-02)


### Bug Fixes

* Show placeholder while loading jsme editor ([af5cd7e](https://github.com/molinfo-vienna/nerdd-frontend/commit/af5cd7ed3d937768743429fa36910d607af2df12))

## [1.3.12](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.11...v1.3.12) (2025-09-01)


### Bug Fixes

* Assume that exampleSmiles is defined ([66bcc87](https://github.com/molinfo-vienna/nerdd-frontend/commit/66bcc87a6171a5130cb7653a3306ea776a036e88))
* Use regex to split SMILES strings ([17fa31a](https://github.com/molinfo-vienna/nerdd-frontend/commit/17fa31ab459e128b00da4af8645858383c0f047b))

## [1.3.11](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.10...v1.3.11) (2025-08-30)


### Bug Fixes

* Make checkbox labels clickable ([fb48686](https://github.com/molinfo-vienna/nerdd-frontend/commit/fb486866b153e30acf6ac0c988f211ae72a71b86))

## [1.3.10](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.9...v1.3.10) (2025-08-28)


### Bug Fixes

* Enable resubmitting the form after errors from server ([cac3fa3](https://github.com/molinfo-vienna/nerdd-frontend/commit/cac3fa3c1a9dbf8f129e6e7e37b6d33b07b7d886))

## [1.3.9](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.8...v1.3.9) (2025-08-28)


### Bug Fixes

* Display errors from server when creating a job ([b7c3bdd](https://github.com/molinfo-vienna/nerdd-frontend/commit/b7c3bdd3f1bc02d632e140188a4992b2c4083438))
* Do not expose internal error messages to user ([4116ed0](https://github.com/molinfo-vienna/nerdd-frontend/commit/4116ed0db7e76e2b56a54205ebb53563eca1b6ab))

## [1.3.8](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.7...v1.3.8) (2025-08-14)


### Bug Fixes

* Fix websocket connection bug in chrome ([40dc99f](https://github.com/molinfo-vienna/nerdd-frontend/commit/40dc99fd76dd264e13c7cbc8a227c80ddc105810))

## [1.3.7](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.6...v1.3.7) (2025-08-05)


### Bug Fixes

* Adapt JobForm to MoleculeEditor ([6ff5c2f](https://github.com/molinfo-vienna/nerdd-frontend/commit/6ff5c2f58320747796119ef328012b2add6501dc))
* Adapt style of MoleculeEditor ([cdc611b](https://github.com/molinfo-vienna/nerdd-frontend/commit/cdc611b6c2c334ac973ac3e0e91d57d69cbf4686))
* Add depict prop to MoleculeEditor ([f5162f4](https://github.com/molinfo-vienna/nerdd-frontend/commit/f5162f4ffdac7f41a0bfef4286ffc5d47d377796))
* Add key prop in ModuleHeader ([8e03ac6](https://github.com/molinfo-vienna/nerdd-frontend/commit/8e03ac6cb9c2ec71e1cf2b68e2690b2394d88952))

## [1.3.6](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.5...v1.3.6) (2025-08-01)


### Bug Fixes

* Center placeholders on landing page ([7c0fa55](https://github.com/molinfo-vienna/nerdd-frontend/commit/7c0fa551438c1a0a5f7f8e8f2e6f25f82cde1b3c))

## [1.3.5](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.4...v1.3.5) (2025-07-31)


### Bug Fixes

* Let all API card buttons have the same size ([b4f65c0](https://github.com/molinfo-vienna/nerdd-frontend/commit/b4f65c0600f99f3ca3dec5589eccf6f6fc72985c))
* Show API tool list on mobile ([01aa058](https://github.com/molinfo-vienna/nerdd-frontend/commit/01aa058aa159e30e548c7200cbe1f1a9bdb1fa22))
* Show module description on API page ([8eb2d75](https://github.com/molinfo-vienna/nerdd-frontend/commit/8eb2d75a2e052ba435166b1a249439e79a5404b6))

## [1.3.4](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.3...v1.3.4) (2025-07-30)


### Bug Fixes

* Extract LazyLoadImage component ([f83ee82](https://github.com/molinfo-vienna/nerdd-frontend/commit/f83ee82589a6c5f57f0822668183542b48cd3bdd))
* Improve layout on API page ([f511382](https://github.com/molinfo-vienna/nerdd-frontend/commit/f5113829aa0d0f21675b3e706b283d689ae7726b))
* Make sure that card buttons have same width ([c6423f3](https://github.com/molinfo-vienna/nerdd-frontend/commit/c6423f384492904dce6b88581290e6eb05a7a8cc))
* Use className in ApiDocs ([6e7abf3](https://github.com/molinfo-vienna/nerdd-frontend/commit/6e7abf3e84798e8187d21396d781626cdee4b1d0))
* Use LazyLoadImage in ApiHeader ([e61e56b](https://github.com/molinfo-vienna/nerdd-frontend/commit/e61e56b43447f99aa74eaf82ed57d73bf9931a41))
* Use LazyLoadImage in ModuleCard ([f85c38a](https://github.com/molinfo-vienna/nerdd-frontend/commit/f85c38a8db92f3732e75edadbdf284611f71ecb7))
* Use placeholders on API page when loading ([ddd3ccb](https://github.com/molinfo-vienna/nerdd-frontend/commit/ddd3ccbcbda30a1f80e0c899e73deb0910543b02))
* Use skipToken in useModule hook ([23ef2fa](https://github.com/molinfo-vienna/nerdd-frontend/commit/23ef2fabd947a3bbf0aeeb6bab573058ed88e5d7))

## [1.3.3](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.2...v1.3.3) (2025-07-29)


### Bug Fixes

* Add type to breadcrumbElements ([bd92174](https://github.com/molinfo-vienna/nerdd-frontend/commit/bd921741409c7023421467063529fcef24fd02e8))
* Implement ApiHeader component ([845b7bb](https://github.com/molinfo-vienna/nerdd-frontend/commit/845b7bb78d1f344eefe1a376228c3ff536587f9a))
* Normalize route names ([abef148](https://github.com/molinfo-vienna/nerdd-frontend/commit/abef14891c77394fdbaf3d6c9138a25f406048bf))
* Use correct route to APIs ([4c82f2d](https://github.com/molinfo-vienna/nerdd-frontend/commit/4c82f2d7c11832df45006c25100727afa13cd471))
* Use different header in ApiDocsPage ([e3974d0](https://github.com/molinfo-vienna/nerdd-frontend/commit/e3974d087fff893eebce63f62b9654fc7d628837))

## [1.3.2](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.1...v1.3.2) (2025-07-29)


### Bug Fixes

* Extract useModules hook ([8c1ada6](https://github.com/molinfo-vienna/nerdd-frontend/commit/8c1ada672c0abf1fa07cfb9e37bd8f9dd8a2070e))
* Leave proxy paths untouched ([ddab37c](https://github.com/molinfo-vienna/nerdd-frontend/commit/ddab37c5d381ce92ce94925e73541e7e29b18abd))
* Move services hooks into separate folder ([e28040b](https://github.com/molinfo-vienna/nerdd-frontend/commit/e28040bdef1b06a1350f68eaeed3894cc04ea1ae))
* Return module list in services ([53aa8e9](https://github.com/molinfo-vienna/nerdd-frontend/commit/53aa8e9d96c50e1becdeac89d03453722efa506e))
* Simplify error handling on LandingPage ([5f3cd93](https://github.com/molinfo-vienna/nerdd-frontend/commit/5f3cd932d5e65d607c6adb509f9d88de2848821e))
* Sort modules by rank in services ([9cba7b6](https://github.com/molinfo-vienna/nerdd-frontend/commit/9cba7b6f85bb3a336d363fc6c6e19e83a4ea3d05))

## [1.3.1](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.3.0...v1.3.1) (2025-07-28)


### Bug Fixes

* Adapt placeholder size to image in table ([6453946](https://github.com/molinfo-vienna/nerdd-frontend/commit/64539465297bddcd8217b620cc8e78fea1386187))
* Add className parameter to ImagePlaceholder ([36a9ffc](https://github.com/molinfo-vienna/nerdd-frontend/commit/36a9ffc5b81e6d406420dcfa57b060881c64ee09))
* Uncomment reportWebVitals ([cddf46a](https://github.com/molinfo-vienna/nerdd-frontend/commit/cddf46a3ab56317e6551eda3dd750a567f483722))
* Use light background for placeholders ([61b82d2](https://github.com/molinfo-vienna/nerdd-frontend/commit/61b82d2f8d201d9495ca942460863742f6e281ae))

# [1.3.0](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.15...v1.3.0) (2025-07-27)


### Bug Fixes

* Disable logging in Mockserver ([72ac309](https://github.com/molinfo-vienna/nerdd-frontend/commit/72ac30990f385aec5e724366361b51602eca8787))
* Implement endpoint for fetching resources like SVGs ([0fa4279](https://github.com/molinfo-vienna/nerdd-frontend/commit/0fa427967ae0b10a7d6157895da0ae27a2b5404b))
* Implement ImagePlaceholder component ([678dde2](https://github.com/molinfo-vienna/nerdd-frontend/commit/678dde28ab6003b8115d965daaeb6f07d9e586c9))
* Provide option to override base url in baseApi ([b38b64f](https://github.com/molinfo-vienna/nerdd-frontend/commit/b38b64f8a6d62fbce29d92eafc5340d5831652ce))
* Show placeholder for module cards while loading ([dc430b2](https://github.com/molinfo-vienna/nerdd-frontend/commit/dc430b26874f30b43b2e40a888b8939dada4cf54))
* Simplify resources mocking in Mockserver ([d6b2c2e](https://github.com/molinfo-vienna/nerdd-frontend/commit/d6b2c2eb02376c46e2413be6671e9e4a33748e11))


### Features

* Add placeholder while loading molecule images ([5140146](https://github.com/molinfo-vienna/nerdd-frontend/commit/51401466bd737771d1c46e8bcd0f8a1c9032c3c0))

## [1.2.15](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.14...v1.2.15) (2025-07-27)


### Bug Fixes

* Handle pages that are not guaranteed to exist ([c7f2661](https://github.com/molinfo-vienna/nerdd-frontend/commit/c7f26619c326f750c5e8b45bab71398be20e5d41))
* Simplify error handling in ResultsPage ([f335e05](https://github.com/molinfo-vienna/nerdd-frontend/commit/f335e05c137362ee401ddcf1a6c6bd690650a82c))
* Use error boundary in LandingPage ([d81451e](https://github.com/molinfo-vienna/nerdd-frontend/commit/d81451e0da71fef77979aa9760bed666d553bae8))

## [1.2.14](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.13...v1.2.14) (2025-07-27)


### Bug Fixes

* Add rank to module type ([5db0c56](https://github.com/molinfo-vienna/nerdd-frontend/commit/5db0c56c3c880ba8451e1da2808af80394378e43))

## [1.2.13](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.12...v1.2.13) (2025-07-26)


### Bug Fixes

* Add missing JSME files ([a4a29eb](https://github.com/molinfo-vienna/nerdd-frontend/commit/a4a29eb04165560040d4e72fd0e65a424a2e8a87))

## [1.2.12](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.11...v1.2.12) (2025-07-25)


### Bug Fixes

* Add SRI in build ([b9c51cb](https://github.com/molinfo-vienna/nerdd-frontend/commit/b9c51cbf4558abd13ef1e879f95a7df6b1a10c63))
* Install vite-plugin-sri3 ([0db969a](https://github.com/molinfo-vienna/nerdd-frontend/commit/0db969a041e780d7ce0caeabf1ff211821c70dbe))

## [1.2.11](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.10...v1.2.11) (2025-07-25)


### Bug Fixes

* Import only the latin subset of fonts ([7819cf4](https://github.com/molinfo-vienna/nerdd-frontend/commit/7819cf411f21e3f155cae289b9137ab9c935144d))

## [1.2.10](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.9...v1.2.10) (2025-07-25)


### Bug Fixes

* Update version of JSME ([4ed9537](https://github.com/molinfo-vienna/nerdd-frontend/commit/4ed9537da55d6cc9493887257a3d20c71855c154))
* Use new version of JSME ([de1073e](https://github.com/molinfo-vienna/nerdd-frontend/commit/de1073e5bf39c2c94a7ea48886b735df316a16fd))

## [1.2.9](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.8...v1.2.9) (2025-07-22)


### Bug Fixes

* Fetch module logo from different backend route ([71ecbad](https://github.com/molinfo-vienna/nerdd-frontend/commit/71ecbadc98d4734b4d6458610cbebdd6c16b71a4))
* Ignore logo in module normalization ([f086028](https://github.com/molinfo-vienna/nerdd-frontend/commit/f086028c8c04b97f3fae8680cea3201fc12c9350))
* Remove logo from Module type ([3c41ae0](https://github.com/molinfo-vienna/nerdd-frontend/commit/3c41ae05e0d1914518b4188f21e4790e47883ef2))

## [1.2.8](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.7...v1.2.8) (2025-07-22)


### Bug Fixes

* Remove theme color variables ([8f7fd44](https://github.com/molinfo-vienna/nerdd-frontend/commit/8f7fd449576221db1207f35a99c7e215448dd0ed))

## [1.2.7](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.6...v1.2.7) (2025-07-22)


### Bug Fixes

* Adapt column layout in AboutPage ([ff35d56](https://github.com/molinfo-vienna/nerdd-frontend/commit/ff35d56089cdb1bded73fbc43d72b0edae5e43b7))
* Adapt column layout in ApiDocsPage ([45e42cd](https://github.com/molinfo-vienna/nerdd-frontend/commit/45e42cddc235106898dcd55a83320651a76a6e99))
* Center info card verically ([b577b5d](https://github.com/molinfo-vienna/nerdd-frontend/commit/b577b5df4a32d74c6bb85a7ee7e47d36a914f5fb))
* Fine-tune responsive design in ModuleHeader ([4b21ad8](https://github.com/molinfo-vienna/nerdd-frontend/commit/4b21ad85d22ab38226164e958a39e05223abe440))
* Fix typo in ApiCard ([4f27aec](https://github.com/molinfo-vienna/nerdd-frontend/commit/4f27aec81ea500aa9f471a0030224990eaeee83d))
* Move API docs to separate feature ([41a499a](https://github.com/molinfo-vienna/nerdd-frontend/commit/41a499ac7141de1a104a1a3a899733b4830ce056))
* Rename DeveloperPage to ApiDocsPage ([b858266](https://github.com/molinfo-vienna/nerdd-frontend/commit/b8582666665a04c01f68c54b4adb725f0655daf4))
* Use correct import instruction in ApiDocs ([5d28830](https://github.com/molinfo-vienna/nerdd-frontend/commit/5d28830639e27c361284c7b803bb941f9989c587))
* Use same header in ApiDocsPage as in AboutPage ([dc0a697](https://github.com/molinfo-vienna/nerdd-frontend/commit/dc0a697a95f73c79c4c62b9eabde893f13ed9d59))

## [1.2.6](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.5...v1.2.6) (2025-07-21)


### Bug Fixes

* Make use of error boundary when fetching job status ([f8bc8ca](https://github.com/molinfo-vienna/nerdd-frontend/commit/f8bc8ca9a846597e5c19b330f95a4e7ac7b2ee7f))
* Simplify fetching job status in NavigationBar ([09bc653](https://github.com/molinfo-vienna/nerdd-frontend/commit/09bc65323dff8ac8c8ab09d780c854bf92d1f1ad))
* Simplify fetching job status in ResultsPage ([eb0c132](https://github.com/molinfo-vienna/nerdd-frontend/commit/eb0c132208245312910a491968649429ced9466d))

## [1.2.5](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.4...v1.2.5) (2025-07-21)


### Bug Fixes

* Add custom error class for RTK Query ([06ffa18](https://github.com/molinfo-vienna/nerdd-frontend/commit/06ffa185d277878c4fc3b20a36bd8fb7325dc718))
* Add errorElement to react router ([7b381af](https://github.com/molinfo-vienna/nerdd-frontend/commit/7b381afe18f650c4c0ff20a1d34170e7c83df74a))
* Add RouteError class ([345eb9d](https://github.com/molinfo-vienna/nerdd-frontend/commit/345eb9dd13365502ee748980dc5caeb65320fed7))
* Add UnknownError class ([b8af7f5](https://github.com/molinfo-vienna/nerdd-frontend/commit/b8af7f5efee369af165a522fd77e2259abd8c3e6))
* Create base error class ([5690904](https://github.com/molinfo-vienna/nerdd-frontend/commit/5690904926487e6a8fa1bbb47d04abd7db884c20))
* Create SuspenseProvider ([c318b96](https://github.com/molinfo-vienna/nerdd-frontend/commit/c318b96b9cbe5d4660a1bf8fb9489c18db9dc210))
* Extend UnknownError ([2184037](https://github.com/molinfo-vienna/nerdd-frontend/commit/2184037e674badaa8ddb30702e3c20c49caf8c46))
* Give app an ErrorBoundary ([bd8be7b](https://github.com/molinfo-vienna/nerdd-frontend/commit/bd8be7b53701d2cf454063f7879b71b6e47c49bb))
* Handle routing errors in ErrorPage ([cb09055](https://github.com/molinfo-vienna/nerdd-frontend/commit/cb090552b28ee0b6ba42edbb11fda0f4785be828))
* Implement ErrorBoundaryProvider ([7b1cefb](https://github.com/molinfo-vienna/nerdd-frontend/commit/7b1cefbf908c8dc68b208fa312b1bb8c467b278e))
* Install react-error-boundary ([1d9cb26](https://github.com/molinfo-vienna/nerdd-frontend/commit/1d9cb26a3fa8cfceed676766d16ed96cb1b2a6d0))
* Make use of ErrorBoundary when fetching current module ([0ca9345](https://github.com/molinfo-vienna/nerdd-frontend/commit/0ca93453b210ac0016286929f227872b34d05c97))
* Move Debug component to DebugProvider ([3c6f616](https://github.com/molinfo-vienna/nerdd-frontend/commit/3c6f616a4857b8c44068bd052bb648d9698129aa))
* Move RouteError to errorHandling feature ([2f8e6de](https://github.com/molinfo-vienna/nerdd-frontend/commit/2f8e6de08a11a7822857a128ffab7ecb71e7b418))
* Nest content in Debug component ([043df21](https://github.com/molinfo-vienna/nerdd-frontend/commit/043df21f2cd7140940c40e7671c7780bd8706da6))
* Normalize error in ForwardError component ([1fc4bec](https://github.com/molinfo-vienna/nerdd-frontend/commit/1fc4bec8bbf98fc983a941f9d04835f05fb2c2fd))
* Remove redundant not_found route ([1af24fb](https://github.com/molinfo-vienna/nerdd-frontend/commit/1af24fb343087f7df67ce5c07907bf30d3e1351f))
* Simplify fetching module in AboutPage ([cf27fe8](https://github.com/molinfo-vienna/nerdd-frontend/commit/cf27fe80753032da8b3b422e107efff620e507d3))
* Simplify fetching module in CreateJobPage ([cb95c70](https://github.com/molinfo-vienna/nerdd-frontend/commit/cb95c701f599bfe5ca5a6000565752025346e839))
* Simplify fetching module in DeveloperPage ([d79c650](https://github.com/molinfo-vienna/nerdd-frontend/commit/d79c65067bc5a2039da969507ca88ffa6802b8af))
* Simplify fetching module in Footer ([c522fcd](https://github.com/molinfo-vienna/nerdd-frontend/commit/c522fcd7922f030be9a0693e65a0ecd93b11223d))
* Simplify fetching module in NavigationBar ([3c39ff9](https://github.com/molinfo-vienna/nerdd-frontend/commit/3c39ff934a38c501b2c6c25e7bb270aaab79434f))
* Simplify fetching module in ResultsPage ([66cc1c3](https://github.com/molinfo-vienna/nerdd-frontend/commit/66cc1c397362699ce5598c3ff7cd8e6149e70eb5))
* Transform and forward route errors ([9a4a670](https://github.com/molinfo-vienna/nerdd-frontend/commit/9a4a670d295299c7748d4fcaae9b06d3bef6896c))
* Uninstall react-error-boundary ([4b9e489](https://github.com/molinfo-vienna/nerdd-frontend/commit/4b9e48937ca5f0a2197d6de2692acfa9cb955471))
* Use react router's built-in ErrorBoundary ([c4f13dc](https://github.com/molinfo-vienna/nerdd-frontend/commit/c4f13dc950cc30c1e61f4efa4698465061ea29d1))

## [1.2.4](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.3...v1.2.4) (2025-07-18)


### Bug Fixes

* Use javascript to control hamburger menu (instead of data attributes) ([7373100](https://github.com/molinfo-vienna/nerdd-frontend/commit/73731008a4abec2255fb58fdee49bd71d9c37eaa))

## [1.2.3](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.2...v1.2.3) (2025-07-18)


### Bug Fixes

* Decrease font size in table of contents ([8a48371](https://github.com/molinfo-vienna/nerdd-frontend/commit/8a483718c6f18c1a31c889e590abff4f9f201ec9))

## [1.2.2](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.1...v1.2.2) (2025-07-18)


### Bug Fixes

* Make exampleSmiles mandatory in Module ([f9da363](https://github.com/molinfo-vienna/nerdd-frontend/commit/f9da363346a292130bd4ddf299bbda5f84740ede))
* Provide default value for exampleSmiles ([9052ad7](https://github.com/molinfo-vienna/nerdd-frontend/commit/9052ad79170f6f639abe956f10950540146516f3))

## [1.2.1](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.2.0...v1.2.1) (2025-07-18)


### Bug Fixes

* Expose bootstrap spacer variables ([c7ed2c7](https://github.com/molinfo-vienna/nerdd-frontend/commit/c7ed2c7cb60f88bd101baa73323a5d5b4be1cb85))
* Use html links in documentation to render variables ([1f6086f](https://github.com/molinfo-vienna/nerdd-frontend/commit/1f6086f90c5b7bdb74ce7e5a51035c211805737d))
* Use plain css for TableOfContents component ([2d38464](https://github.com/molinfo-vienna/nerdd-frontend/commit/2d38464c563223fb8472c0be543e663d9a4e413c))

# [1.2.0](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.17...v1.2.0) (2025-07-18)


### Bug Fixes

* Add complex job creation example for Python ([93f5588](https://github.com/molinfo-vienna/nerdd-frontend/commit/93f55884288a4c3be768cefbdbf8c96604d681d2))
* Add example to delete jobs in Python ([a539594](https://github.com/molinfo-vienna/nerdd-frontend/commit/a5395949f57df4794c66f355f9e111185bfdc5b3))
* Add example to get job status ([f8357ef](https://github.com/molinfo-vienna/nerdd-frontend/commit/f8357ef2fe574cfe7a9946e93c514cca28bf3fdb))
* Add example to get results in Python ([90d7f45](https://github.com/molinfo-vienna/nerdd-frontend/commit/90d7f45d2b01d550ef7d4415989ab73e10bd948f))
* Add example to upload job with file in Python ([827ed3e](https://github.com/molinfo-vienna/nerdd-frontend/commit/827ed3efdf6a71cd9641a50a209662dd3fb28b2d))
* Add quickstart example for Python ([6858ecf](https://github.com/molinfo-vienna/nerdd-frontend/commit/6858ecfa5af6161a8b243c482cc6d15ed7054276))
* Add rehype-slug plugin to mdx ([e26b5a4](https://github.com/molinfo-vienna/nerdd-frontend/commit/e26b5a47c10e0749a9ef3aea5d498d4ca79a8a94))
* Add simple job creation example for Python ([5412adc](https://github.com/molinfo-vienna/nerdd-frontend/commit/5412adc1d454869e15639fe71b77ebe45383c906))
* Configure mdx-js ([139d486](https://github.com/molinfo-vienna/nerdd-frontend/commit/139d4862b9e9e1726f2cd46efdc8e47c70388f0b))
* Implement component to show code snippets ([ef082d3](https://github.com/molinfo-vienna/nerdd-frontend/commit/ef082d3ea4e8b21b545e64f3133b40d247ef1dcc))
* Implement CopyToClipboard button ([537ac18](https://github.com/molinfo-vienna/nerdd-frontend/commit/537ac18549ea9e5df2a9df4387c218f86528c04f))
* Install highlight.js ([9a77831](https://github.com/molinfo-vienna/nerdd-frontend/commit/9a778314c72314785cfe15e51e633fbcdba0fea4))
* Install mdx-js ([78cf586](https://github.com/molinfo-vienna/nerdd-frontend/commit/78cf5861b422e2a4b100a83f176b339444528cee))
* Use arctis theme for code snippets ([6364073](https://github.com/molinfo-vienna/nerdd-frontend/commit/636407397db1bfcd93cdd74a9e222506e620ae82))
* Write text for documentation page ([55a1621](https://github.com/molinfo-vienna/nerdd-frontend/commit/55a1621f3f517c02deb6e7596ae29636dd2c8090))


### Features

* Add page with API instructions ([28f31fa](https://github.com/molinfo-vienna/nerdd-frontend/commit/28f31fa59c445d364b62fee4eb8e3af2e79d28a4))

## [1.1.17](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.16...v1.1.17) (2025-07-14)


### Bug Fixes

* Add output_formats to Module type ([c2d5ba1](https://github.com/molinfo-vienna/nerdd-frontend/commit/c2d5ba17f264d34c2f180f205740b96ab71c45eb))
* Get available output formats from server ([e09b793](https://github.com/molinfo-vienna/nerdd-frontend/commit/e09b793a66f389d5610e72b89ce6b3e165e46455))

## [1.1.16](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.15...v1.1.16) (2025-07-13)


### Bug Fixes

* Adapt code to lodash-es ([a7cdbc4](https://github.com/molinfo-vienna/nerdd-frontend/commit/a7cdbc47bff1f2bfe16ad0984f3322a4427603ff))
* Import Debug component only in development mode ([ba2f9fe](https://github.com/molinfo-vienna/nerdd-frontend/commit/ba2f9fe3d133095f282b1143159aa65bc34e7eb7))
* Import debugReducerSlice only in development mode ([77b0fd3](https://github.com/molinfo-vienna/nerdd-frontend/commit/77b0fd3b6ffce7f41acdb65cd87cbc59eee1e320))
* Replace lodash with lodash-es ([e48b649](https://github.com/molinfo-vienna/nerdd-frontend/commit/e48b64953404afa50271d8a04f41ed4dfdb31f3c))
* Use lazy loading for pages ([b6ac2e9](https://github.com/molinfo-vienna/nerdd-frontend/commit/b6ac2e9f3f8f9e033e3ad88d62676a5c2c6bb978))

## [1.1.15](https://github.com/molinfo-vienna/nerdd-frontend/compare/v1.1.14...v1.1.15) (2025-07-13)


### Bug Fixes

* Adapt all references to PopUp ([f7bc343](https://github.com/molinfo-vienna/nerdd-frontend/commit/f7bc3436d5c5e89399b0425b0a829c00eb08f7b3))
* Decouple Tooltip from ActionButton ([97af8a7](https://github.com/molinfo-vienna/nerdd-frontend/commit/97af8a78a0ddd77a0278c433755a472a3708eec8))
* Remove ProblemIconWithTooltip component ([347487a](https://github.com/molinfo-vienna/nerdd-frontend/commit/347487a4d808aba7dd1d0bd86163700e4d6cf0b0))
* Remove usused variable in DeleteActionButton ([ef0bc69](https://github.com/molinfo-vienna/nerdd-frontend/commit/ef0bc69e4e0d863abdb6088c1fd537776b3eaea2))
* Rename Tooltip component to PopUp ([da26349](https://github.com/molinfo-vienna/nerdd-frontend/commit/da26349b0b8b9e5d08b2409da01dad7c384cfe17))
* Wrap DownloadActionButton with tooltip ([7cbdbd5](https://github.com/molinfo-vienna/nerdd-frontend/commit/7cbdbd56e505f0d491cecb93194e6c3f8184fa9e))

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

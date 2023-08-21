import Module from '../../models/module';
import Page from '../../models/page';
import Widget from '../../models/widget';

type Integer = number | bigint;

declare global {
    namespace controllers {
        namespace page {
            function index(): Promise<Page[]>;
            function indexAppCreated(): Promise<Page[]>;
            function indexUserCreated(): Promise<Page[]>;
            function show(id: Integer): Promise<Widget[]>;
            function add(): Promise<Page>;
            function rename(id: Integer, name: string): Promise<string>;
            function del(id: Integer): Promise<void>;
        }

        namespace widget {
            function add(page: Integer, w: Widget): Promise<Widget>;
            function edit(id: Integer, data: unknown): Promise<Widget>;
            function del(id: Integer): Promise<void>;
        }

        namespace module {
            function index(): Promise<Module[]>;
            function getGrades(id: Integer): Promise<string>;
            function addGrade(id: Integer, grades: string): Promise<string>;
            function editGrade(id: Integer, grade: Number, weight: Number): Promise<string>;
            function deleteGrade(id: Integer): Promise<void>;
        }
    }
}

import Page from '../../models/page';
import Widget from '../../models/widget';

type Integer = number | bigint;

declare global {
    namespace controllers {
        namespace page {
            function index(): Promise<Page[]>;
            function indexUserCreated(): Promise<Page[]>;
            function show(id: Integer): Promise<Widget[]>;
            function add(): Promise<Page>;
            function rename(id: Integer, name: string): Promise<string>;
            function del(id: Integer): Promise<void>;
        }

        namespace widget {
            function add(page: Integer, w: Widget): Promise<Widget>;
            function edit(id: Integer, data: unknown): Promise<void>;
            function del(id: Integer): Promise<void>;
        }
    }
}

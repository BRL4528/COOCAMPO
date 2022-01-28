import { Report } from 'powerbi-report-component';

import { layoutSettings } from '../../../../utils/stylesOfReportPowerBI';

export const ReportBIManagement = () => {
  return (
    <>
      <div className="powerBi">
        <Report
          tokenType="Aad" // "Aad"
          accessToken="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCIsImtpZCI6Ik1yNS1BVWliZkJpaTdOZDFqQmViYXhib1hXMCJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvZTlhNzRiNTYtYzAwOC00NDExLTk2MTYtMGE3ZjE3ZTEyZGFkLyIsImlhdCI6MTY0MzMxNjgwMiwibmJmIjoxNjQzMzE2ODAyLCJleHAiOjE2NDMzMjE5MzcsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJFMlpnWUtpdzNCUjB2OEtOTDF4cnRXdWFmZHFiODNKTHQ1bk9uakNiLy9PcVUycEp6RW9BIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6IjIxYjgwMTQwLTBlYTYtNDFhNC04ZDQzLTU1ZmZjZjE2ZjVkMyIsImFwcGlkYWNyIjoiMCIsImdpdmVuX25hbWUiOiJib3RfY29vYXNnbyIsImlwYWRkciI6IjE3Ny4yMDEuNjcuMTc4IiwibmFtZSI6ImJvdF9jb29hc2dvIiwib2lkIjoiMGM0NmI4OTctZTI1Mi00ZmE0LTlmZWUtZGM1OGVjODcxMjhiIiwicHVpZCI6IjEwMDMyMDAxNjU5NEVCMDciLCJyaCI6IjAuQVZBQVZrdW42UWpBRVVTV0ZncF9GLUV0clVBQnVDR21EcVJCalVOVl84OFc5ZE5RQUY0LiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInN1YiI6ImpESUFXTE5PS2lTcmVqUHZkUE5BVnVrNXdaalc3YzZsTTk0WVBwTC04WTQiLCJ0aWQiOiJlOWE3NGI1Ni1jMDA4LTQ0MTEtOTYxNi0wYTdmMTdlMTJkYWQiLCJ1bmlxdWVfbmFtZSI6ImNvbnRyb2xsZXJAbWlkYXNjb3JwLmRldiIsInVwbiI6ImNvbnRyb2xsZXJAbWlkYXNjb3JwLmRldiIsInV0aSI6ImRkRkRaX3lqVzBDYzM0dkVjN3FWQVEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImQyNGFlZjU3LTE1MDAtNDA3MC04NGRiLTI2NjZmMjljZjk2NiIsImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.aucd49lU81usS6CE55ChOxZtLz6bhA42APlsZ9Gz4cJHluZuzJYCfkO2APZ2_ivDGVFXxaShtGG6R_0ZfIiwzCsKTccF4GtgBf8KHmCz0R4jC4HVA1KQAmm0Ph1lPumbXx6gg3fF0FXBEqpTtlMrYwjIC-0ZHo1DNKkBCoQATlr0cqPpQFiQapTSptJMqRPoCCHxTMxF60qns-GghTZkyqsbwE73uF4QJEf8ymletGSoD9rzSKqY4MvgWMVMdmHkgASMEI2wW1km_4yyxtxup1QinY58bmYRBkPld8NsWad5IKU9FaQ1PsIuPeDs8kFRuwdXKk-aEj7kKVJRxQiqaw"
          embedUrl="https://app.powerbi.com/reportEmbed?reportId=8b9d7c10-1ba8-4039-a8f3-b2ff2b030df3&groupId=71159839-6c48-44f6-90f3-25692a98e2ce&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLUJSQVpJTC1TT1VUSC1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjp0cnVlLCJjZXJ0aWZpZWRUZWxlbWV0cnlFbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWV9fQ%3d%3d"
          embedId="8b9d7c10-1ba8-4039-a8f3-b2ff2b030df3"
          // pageName="Sentiment" // set as current page of the report
          reportMode="View" // open report in a particular mode View/Edit/Create
          // datasetId={datasetId} // required for reportMode = "Create" and optional for dynamic databinding in `report` on `View` mode
          // groupId={groupId} // optional. Used when reportMode = "Create" and to chose the target workspace when the dataset is shared.
          // extraSettings={extraSettings}
          permissions="All"
          style={layoutSettings()}
          // onRender={handleLoaded}
          // onLoad={handleLoaded}
          extraSettings={{
            filterPaneEnabled: false,
            navContentPaneEnabled: false,
          }}
        />
      </div>
    </>
  );
};

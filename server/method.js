var fs = Npm.require('fs');

Meteor.methods({
  'file-upload': function (fileName, fileData) {
    check(fileName, String);

    console.log("received file " + fileName);
    var uploadDir = process.env.PWD + '/.uploads/';
    var data_index = fileData.indexOf('base64') + 7;
    var filedata = fileData.slice (data_index, fileData.length);
    var decode_file = new Buffer(filedata, 'base64');

    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdir(uploadDir, 0777, function (err) {
          if (err) {
            console.log('failed to create directory', err);
            return err;
          }
          else {
            fs.writeFile(uploadDir+"/"+fileName, decode_file, function(err1) {
              if (err1) {
                return console.log (err1);
              }
            });
          }
          return true;
        });
      } catch (e) {
        throw new Meteor.Error(500, 'exception in ', e);
      }
    } else {
      fs.writeFile(uploadDir+"/"+fileName, decode_file, function(err1) {
        if (err1) {
          return console.log (err1);
        }
      });
      return true;
    }
  },

  'move-file': function (doclist, newid) {
    check(doclist, Array);
    check(newid, String);

    var newdir = process.env.PWD + '/.uploads/' + newid;
    var oldpath;
    var newpath;

    if (!fs.existsSync(newdir)) {
      try {
        fs.mkdir(newdir, 0777, function (err) {
          if (err) {
            console.log('failed to create directory', err);
            return err;
          } else {
            doclist.forEach(function (item) {
              oldpath = process.env.PWD + '/.uploads/' + item.filename;
              newpath = process.env.PWD + '/.uploads/' + newid + '/' + item.filename;
              fs.renameSync(oldpath, newpath);
            });
          }
        });
      } catch (e) {
        throw new Meteor.Error(500, 'exception in ', e);
      }
    } else {
      doclist.forEach(function (item) {
        oldpath = process.env.PWD + '/.uploads/' + item.filename;
        newpath = process.env.PWD + '/.uploads/' + newid + '/' + item.filename;
        fs.renameSync(oldpath, newpath);
      });
    }
    return true
  }
});